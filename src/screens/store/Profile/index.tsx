import { AdditionalDetails, ProfileMainDetails } from "@/components/Profile";
import { useGetStoreQuery } from "@/redux/slice/api/storeSlice";

const Profile = () => {
  const { data: store, isFetching } = useGetStoreQuery("", {
    // refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    // pollingInterval: 100000,
  });
  if (isFetching) return <div>Skeleton for profile</div>;
  return (
    <>
      {store && store.data && (
        <section className="w-10/12">
          <h2 className="text-3xl font-semibold mb-10">Store Profile</h2>
          <section className="bg-zinc-800 p-6 rounded-xl text-zinc-100 flex flex-col gap-6 h-fit w-full">
            <ProfileMainDetails
              name={store.data.name}
              profileImage={store?.data?.image}
              compressedProfilePicture={store?.data?.compressedImage}
              email={store?.data?.email}
              emailVerified={store?.data?.emailVerified}
            />
            <div className="border-b-[0.1px] border-zinc-700 w-full"></div>
            <AdditionalDetails
              phoneNumber={store?.data?.phoneNumber}
              countryCode={store?.data?.countryCode}
              phoneNumberVerified={store?.data?.phoneNumberVerified}
            />
          </section>
        </section>
      )}
    </>
  );
};

export default Profile;
