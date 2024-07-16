import { AddressType } from "@/redux/slice/api/user/addressSlice";
import Button from "../Button";
import { Link } from "react-router-dom";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { useTranslation } from "react-i18next";

const DeliveryInformation = ({
  defaultAddress,
}: {
  defaultAddress: AddressType | undefined;
}) => {
  const { t } = useTranslation();
  return (
    <div className="bg-zinc-800 rounded-lg p-4 flex flex-col gap-4 w-full">
      <h3 className="text-2xl font-semibold">{t("shippingInformation")}</h3>
      {defaultAddress ? (
        <div>
          <h4 className="text-lg font-semibold">{t("deliveryAddress")}</h4>
          <div className="flex flex-col sm:flex-row">
            <p className="text-lg">
              {defaultAddress?.apt} {defaultAddress?.block}{" "}
              {defaultAddress?.address}
            </p>
          </div>
          <Button className="text-sm w-fit mt-2">
            <Link to={BROWSER_ROUTE.MANAGE_ADDRESS}>{t("changeAddress")}</Link>
          </Button>
        </div>
      ) : (
        <Button className="text-sm w-fit">
          <Link to={BROWSER_ROUTE.MANAGE_ADDRESS}>{t("addNewAddress")}</Link>
        </Button>
      )}
    </div>
  );
};

export default DeliveryInformation;
