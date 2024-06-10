import { AdditionalDetails, ProfileMainDetails } from "@/components/Profile";
import { useGetStoreQuery } from "@/redux/slice/api/storeSlice";

const Profile = () => {
  const { data: user, isFetching } = useGetStoreQuery("", {
    // refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    // pollingInterval: 100000,
  });

  return (
    <>
      {isFetching ? (
        <div>Skeleton for profile</div>
      ) : (
        <>
          {user && Object.keys(user?.data).length && (
            <section className="w-10/12">
              <h2 className="text-3xl font-semibold mb-10">Store Profile</h2>
              <section className="bg-zinc-800 p-6 rounded-xl text-zinc-100 flex flex-col gap-6 h-fit w-full">
                <ProfileMainDetails
                  name={user.data.name}
                  profileImage={user?.data?.image}
                  compressedProfilePicture={user?.data?.compressedImage}
                  email={user?.data?.email}
                  emailVerified={user?.data?.emailVerified}
                />
                <div className="border-b-[0.1px] border-zinc-700 w-full"></div>
                <AdditionalDetails
                  phoneNumber={user?.data?.phoneNumber}
                  countryCode={user?.data?.countryCode}
                  phoneNumberVerified={user?.data?.phoneNumberVerified}
                />
              </section>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
