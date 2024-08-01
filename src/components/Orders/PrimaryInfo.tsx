import { t } from "i18next";
import moment from "moment-timezone";
import { FC } from "react";
type PrimaryInfoProps = {
  name: string;
  createdAt: Date;
  totalAmount: number;
  status: string;
};
const PrimaryInfo: FC<PrimaryInfoProps> = ({
  name,
  createdAt,
  totalAmount,
  status,
}) => {
  const handleStatus = (status: string) => {
    switch (status) {
      case "PENDING":
        return "Waiting for confirmation from the store";
      case "CONFIRMED":
        return "Order confirmed by the store";
      case "PREPARING":
        return "Order is being prepared";
      case "DELIVERED":
        return "Order has been delivered successfully";
      case "CANCELED":
        return "Order has been cancelled";
      default:
        return status;
    }
  };
  return (
    <>
      <div className="mb-2">
        <h3 className="text-2xl font-bold">{name}</h3>
        <p className="text-gray-400">
          {moment(createdAt).tz("America/New_York").format("lll")}
        </p>
      </div>
      <div className="mb-2">
        <p>
          <span className="font-semibold">{t("totalAmount")}:</span> $
          {totalAmount.toFixed(2)}
        </p>
        <p>
          <span className="font-semibold">{t("status")}:</span>{" "}
          {handleStatus(status)}
        </p>
      </div>
    </>
  );
};

export default PrimaryInfo;