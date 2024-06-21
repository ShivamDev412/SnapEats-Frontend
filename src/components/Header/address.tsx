import { FaLocationDot } from "react-icons/fa6";
import useAddress from "./useAddress";

const Address = () => {
  const {
    defaultAddress,
    handleShowDropdown,
    showDropdown,
    handleHideDropdown,
    changeAddress,
    setIsButtonClicked,
    isManageAddressPage,
  } = useAddress();

  return (
    <div className="w-6/12 xl:w-2/12 relative flex justify-center">
      <button
        className="text-sm lg:text-lg text-center flex items-center gap-2 justify-center w-full"
        onClick={handleShowDropdown}
        onBlur={handleHideDropdown}
      >
        <FaLocationDot />
        <p className="w-11/12 truncate">
          {defaultAddress?.apt} {defaultAddress?.block}
          {defaultAddress?.address}
        </p>
      </button>
      {showDropdown && !isManageAddressPage && (
        <div className="top-8 absolute bg-zinc-950 border-zinc-700 border p-2 rounded-lg w-full flex flex-col gap-2 z-10">
          <h4 className="font-semibold xl:text-lg text-[1rem]">
            Delivery Address
          </h4>
          <p className="text-sm xl:text-[0.9rem] text-medium">
            {defaultAddress?.apt} {defaultAddress?.block}
            {defaultAddress?.address}
          </p>
          <button
            className="bg-primary p-1 font-semibold rounded-md text-sm xl:text-[1rem]"
            onMouseDown={() => setIsButtonClicked(true)}
            onClick={changeAddress}
          >
            Change Address
          </button>
        </div>
      )}
    </div>
  );
};

export default Address;
