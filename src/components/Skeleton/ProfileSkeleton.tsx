import Skeleton from "react-loading-skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="bg-zinc-800 p-6 rounded-xl text-zinc-100 flex flex-col gap-6">
      <section className="flex flex-col gap-2 md:gap-6">
        <h3 className="text-lg lg:text-xl font-bold">Personal Information</h3>
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <Skeleton
            circle={true}
            className="w-[5rem] md:w-[10rem] h-[5rem] md:h-[10rem] rounded-full"
          />
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-2xl md:text-3xl">
              <Skeleton width="30%" />
            </h2>
            <Skeleton width="20%" height={20} />
            <Skeleton width="10%" height={30} className="mt-2" />
          </div>
        </div>
      </section>
      <div className="border-b-[0.1px] border-zinc-700 w-full"></div>
      <section className="flex flex-col gap-2 md:gap-6">
        <h3 className="text-lg md:text-xl font-bold">Additional Information</h3>
        <div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-5 flex-col">
              <Skeleton width={100} height={20} />
              <Skeleton width={70} height={30} className="mt-2" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileSkeleton;
