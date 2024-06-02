import { FaEdit } from "react-icons/fa";
import LazyLoadedImageComponent from "../LazyLoadedImageComponent";
import { Link } from "react-router-dom";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import IsVerified from "../IsVerified";
import ModalComponent from "../Modal";
import VerifyCredentials from "./VerifyCredentials";
import useProfileMainDetails from "./useProfileMainDetails";
import Avatar from "../Avatar";

const ProfileMainDetails: React.FC<{
  name: string;
  email: string;
  emailVerified: boolean;
  profileImage: string;
  compressedProfilePicture: string;
}> = ({
  name,
  email,
  emailVerified,
  profileImage,
  compressedProfilePicture,
}) => {
  const { openModal, handleCloseModal, verifyEmail } = useProfileMainDetails();
  return (
    <section className="flex flex-col gap-2 md:gap-6">
      <h3 className="text-lg lg:text-xl font-bold">Personal Information</h3>
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        {profileImage && compressedProfilePicture ? (
          <LazyLoadedImageComponent
            image={profileImage}
            compressedImage={compressedProfilePicture}
            alt={`${name}_profile_picture`}
            className="w-[5rem] md:w-[10rem] h-[5rem] md:h-[10rem] rounded-full"
          />
        ) : (
          <Avatar name={name} className="w-[5rem] md:w-[10rem] h-[5rem] md:h-[10rem] text-[5rem]"/>
        )}

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl">{name}</h2>
          <div className="flex items-center gap-4 flex-wrap">
            <p className="text-sm md:text-[16px] font-medium">{email}</p>
            <div>
              {emailVerified ? (
                <IsVerified verified={true} />
              ) : (
                <IsVerified verified={false} onClick={() => verifyEmail()} />
              )}
            </div>
          </div>

          <Link
            to={BROWSER_ROUTE.EDIT_PROFILE}
            className="flex gap-2 text-sm lg:text-lg items-center italic"
          >
            <FaEdit /> <p>Edit Profile</p>
          </Link>
        </div>
      </div>
      <ModalComponent
        open={openModal}
        handleClose={handleCloseModal}
        modalTitle={"add-phone-number"}
      >
        <VerifyCredentials
          phoneNumber=""
          handleCloseModal={handleCloseModal}
          type={"email"}
          email={email}
        />
      </ModalComponent>
    </section>
  );
};

export default ProfileMainDetails;
