import { FaEdit } from "react-icons/fa";
import LazyLoadedImageComponent from "../LazyLoadedImageComponent";
import IsVerified from "../IsVerified";
import ModalComponent from "../Modal";
import VerifyCredentials from "./VerifyCredentials";
import useProfileMainDetails from "./useProfileMainDetails";
import Avatar from "../Avatar";
import Button from "../Button";
import EditProfile from "./EditProfile";
import StorePlaceholderImage from "@/assets/store_placeholder.webp";
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
  const {
    openModal,
    handleCloseModal,
    verifyEmail,
    modalContentType,
    register,
    handleSubmit,
    getValues,
    errors,
    onSubmit,
    isLoading,
    updateProfile,
    isUser,
  } = useProfileMainDetails();
  return (
    <section className="flex flex-col gap-2 md:gap-6">
      <h3 className="text-lg lg:text-xl font-bold">
        {isUser ? " Personal Information" : "Store Primary Information"}
      </h3>
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        {profileImage && compressedProfilePicture ? (
          <LazyLoadedImageComponent
            image={profileImage}
            compressedImage={compressedProfilePicture}
            alt={`${name}_profile_picture`}
            className="w-[5rem] md:w-[10rem] h-[5rem] md:h-[10rem] rounded-full"
          />
        ) : !isUser ? (
          <div className="w-[5rem] md:w-[10rem] h-[5rem] md:h-[10rem] rounded-full bg-zinc-700">
            <img
              src={StorePlaceholderImage}
              alt="store_placeholder_image"
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <Avatar
            name={name}
            className="w-[5rem] md:w-[10rem] h-[5rem] md:h-[10rem] text-[2.5rem] sm:text-[5rem]"
          />
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

          <Button
            className="flex gap-2 text-sm lg:text-lg items-center italic bg-transparent p-0 w-fit"
            onClick={() => updateProfile(name, email, profileImage)}
          >
            <FaEdit /> <p>Edit Profile</p>
          </Button>
        </div>
      </div>
      <ModalComponent
        open={openModal}
        handleClose={handleCloseModal}
        modalTitle={"add-phone-number"}
      >
        {modalContentType === "verifyEmail" ? (
          <VerifyCredentials
            phoneNumber=""
            handleCloseModal={handleCloseModal}
            type={"email"}
            email={email}
          />
        ) : (
          <EditProfile
            register={register}
            errors={errors}
            getValues={getValues}
            isLoading={isLoading}
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
            setValue={() => {}}
            isUser={isUser}
          />
        )}
      </ModalComponent>
    </section>
  );
};

export default ProfileMainDetails;
