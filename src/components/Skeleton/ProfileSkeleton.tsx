import Skeleton from "react-loading-skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="p-6 rounded-xl animate-pulse text-zinc-100 flex flex-col gap-6 h-fit w-full">
      <section className="flex flex-col gap-2 md:gap-6">
        <Skeleton height={28} width={200} />
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <Skeleton
            circle={true}
            className="w-[5rem] md:w-[10rem] h-[5rem] md:h-[10rem] rounded-full"
          />
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-2xl md:text-3xl">
              <Skeleton width="40%" />
            </h2>
            <Skeleton width="30%" height={20} />
            <Skeleton width="20%" height={30} className="mt-2" />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-2 md:gap-6">
        <Skeleton height={28} width={200} />
        <div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-5 flex-col">
              <Skeleton width={300} height={20} />
              <Skeleton width={300} height={30} className="mt-2" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileSkeleton;
