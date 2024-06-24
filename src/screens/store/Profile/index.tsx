import {
  AdditionalDetails,
  ProfileMainDetails,
  StoreFoodTypes,
} from "@/components/Profile";
import StoreProfileSkeleton from "@/components/Skeleton/StoreProfileSkeleton";
import { useGetStoreQuery } from "@/redux/slice/api/store/profileSlice";

const Profile = () => {
  const { data: store, isFetching } = useGetStoreQuery("", {
    // refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    // pollingInterval: 100000,
  });
  if (isFetching) return <StoreProfileSkeleton />;
  return (
    <>
      {store && store.data && (
        <section className="w-10/12 flex flex-col gap-6">
          <h2 className="text-3xl font-semibold">Store Profile</h2>
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
          <section className="bg-zinc-800 p-6 rounded-xl text-zinc-100 flex flex-col gap-6 h-fit w-full">
            <StoreFoodTypes />
          </section>
        </section>
      )}
    </>
  );
};

export default Profile;
