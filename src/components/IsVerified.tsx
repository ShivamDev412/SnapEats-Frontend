import Button from "./Button";

const IsVerified = ({
  verified,
  onClick,
}: {
  verified: boolean;
  onClick?: () => void;
}) => {
  return (
    <>
      {verified ? (
        <div className="px-2 py-[0.2rem] rounded-[25px] border-2 border-green-800 items-center">
          <p className="font-medium text-center text-[12px] xl:text-sm text-green-800">
            Verified
          </p>
        </div>
      ) : (
        <Button
          className="px-2 py-[0.2rem] rounded-[25px] border-2 border-red-800 items-center bg-transparent text-red-800 text-[12px] xl:text-sm"
          onClick={onClick}
        >
          Not Verified
        </Button>
      )}
    </>
  );
};

export default IsVerified;
