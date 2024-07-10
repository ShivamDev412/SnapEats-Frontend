import { useAddressQuery } from "@/redux/slice/api/user/addressSlice";
import React from "react";
import Button from "../Button";
import { Link } from "react-router-dom";
import { BROWSER_ROUTE } from "@/utils/Endpoints";

const DeliveryInformation = () => {
  const { data: address } = useAddressQuery("");
  const defaultAddress = address?.data?.find(
    (item: any) => item.isDefault === true
  );
  return (
    <div className="bg-zinc-800 rounded-lg p-4 flex flex-col gap-4">
      <h3 className="text-2xl font-semibold">Shipping Information</h3>
      <div>
        <h4 className="text-lg font-semibold">Delivery Address</h4>
        <div className="flex flex-col sm:flex-row gap-2">
          <p className="text-lg">
            {defaultAddress?.apt} {defaultAddress?.block}{" "}
            {defaultAddress?.address}
          </p>
          <Button className="p-1 text-sm">
            <Link to={BROWSER_ROUTE.MANAGE_ADDRESS}>Change Address</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInformation;
