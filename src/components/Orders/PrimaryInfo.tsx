import { t } from "i18next";
import moment from "moment-timezone";
import { FC } from "react";
import Button from "../Button";
type PrimaryInfoProps = {
  name: string;
  createdAt: Date;
  totalAmount: number;
  status: string;
  type: "store" | "user";
};
const PrimaryInfo: FC<PrimaryInfoProps> = ({
  name,
  createdAt,
  totalAmount,
  status,
  type,
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
      <div className="mb-2 flex flex-col gap-2">
        <p>
          <span className="font-semibold">{t("totalAmount")}:</span> $
          {totalAmount.toFixed(2)}
        </p>
        <p>
          {type === "user" ? (
            <>
              <span className="font-semibold">{t("status")}:</span>{" "}
              {handleStatus(status)}
            </>
          ) : (
            <div>
              <Button className="text-sm bg-green-800">
                Mark as Out for Delivery
              </Button>
            </div>
          )}
        </p>
      </div>
    </>
  );
};

export default PrimaryInfo;
