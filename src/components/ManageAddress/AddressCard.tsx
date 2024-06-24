import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useState } from "react";
import { FaEdit, FaHome } from "react-icons/fa";
import {
  MdOutlineWork,
  MdMiscellaneousServices,
  MdDelete,
  MdFamilyRestroom,
} from "react-icons/md";
import { IoSchoolSharp } from "react-icons/io5";
import { GiThreeFriends } from "react-icons/gi";
import { FaUmbrellaBeach } from "react-icons/fa6";

import { AddressType } from "@/redux/slice/api/user/addressSlice";
import Button from "../Button";

const AddressCard: React.FC<{
  address: AddressType;
  handleDelete: (id: string) => void;
  markAsDefaultAddress: (id: string) => void;
  handleUpdateAddress: (address: AddressType) => void;
}> = ({ address, handleDelete, markAsDefaultAddress, handleUpdateAddress }) => {
  const [defaultAddress, setDefaultAddress] = useState(false);
  useEffect(() => {
    address && setDefaultAddress(address?.isDefault as boolean);
  }, [address]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      markAsDefaultAddress(address?.id as string);
      setDefaultAddress(event.target.checked);
    } 

  };
  const renderAddressType = (type: string) => {
    switch (type) {
      case "home":
        return <FaHome className="text-2xl" />;
      case "work":
        return <MdOutlineWork className="text-2xl" />;
      case "school":
        return <IoSchoolSharp className="text-2xl" />;
      case "family":
        return <MdFamilyRestroom className="text-2xl" />;
      case "friends":
        return <GiThreeFriends className="text-2xl" />;
      case "vacation_home":
        return <FaUmbrellaBeach className="text-2xl" />;
      default:
        return <MdMiscellaneousServices className="text-2xl" />;
    }
  };
  return (
    <div className="w-full lg:w-[49%] xl:w-[32.4%] rounded-lg p-4 bg-zinc-800 flex flex-col justify-between gap-4 h-[2in]">
      <div className="flex items-start justify-between">
        <div className="w-10/12 lg:w-8/12">
          <p>
            {address.apt && `${address.apt},`}{" "}
            {address.block && `${address.block},`}
          </p>
          <p className="w-full text-ellipsis">{address.address}</p>
        </div>
        <div className="rounded-[25px] flex gap-1 items-center justify-center">
          <Checkbox
            checked={defaultAddress}
            onChange={handleChange}
            sx={{
              color: "white",
              padding: 0,
              "&.Mui-checked": {
                color: "#E83C54",
              },
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
          <p>Default</p>
        </div>
      </div>
      <div className="flex justify-between">
        {renderAddressType(address.type)}
        <div className="flex gap-2">
          <Button
            className="bg-yellow-700"
            onClick={() => handleUpdateAddress(address)}
          >
            <FaEdit />
          </Button>
          <Button
            className="bg-red-800"
            onClick={() => handleDelete(address?.id as string)}
          >
            <MdDelete />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
