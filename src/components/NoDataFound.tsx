const NoDataFound = ({ message }: { message: string }) => {
  return (
    <div className="flex h-full w-full justify-center items-center">
      <p className="font-semibold text-lg">{message}</p>
    </div>
  );
};

export default NoDataFound;
