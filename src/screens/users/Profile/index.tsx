import { AdditionalDetails, ProfileMainDetails } from "@/components/Profile";
import { UserType, useUserQuery } from "@/redux/slice/api/userSlice";

const Profile = () => {
  const { data: user, isFetching } = useUserQuery("", {
    // refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    // pollingInterval: 100000,
  });
  const {
    name,
    profilePicture,
    compressedProfilePicture,
    phoneNumber,
    email,
    emailVerified,
    phoneNumberVerified,
    countryCode,
  } = user?.data as UserType;
  return (
    <>
      {isFetching ? (
        <div>Skeleton for profile</div>
      ) : (
        <div className="bg-zinc-800 p-6 rounded-xl text-zinc-100 flex flex-col gap-6 h-fit w-full">
          <ProfileMainDetails
            name={name}
            profileImage={profilePicture}
            compressedProfilePicture={compressedProfilePicture}
            email={email}
            emailVerified={emailVerified}
          />
          <div className="border-b-[0.1px] border-zinc-700 w-full"></div>
          <AdditionalDetails
            phoneNumber={phoneNumber}
            countryCode={countryCode}
            phoneNumberVerified={phoneNumberVerified}
          />
        </div>
      )}
    </>
  );
};

export default Profile;
