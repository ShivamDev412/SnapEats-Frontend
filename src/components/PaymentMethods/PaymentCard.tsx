import  { FC } from "react";
import CardBrand from "./CardBrand";
import Button from "../Button";
import { PaymentMethodType } from "@/redux/slice/api/user/paymentSlice";
import usePaymentCard from "./usePaymentCard";

type PaymentCardProps = {
  paymentMethod: PaymentMethodType;
  defaultPaymentMethod: string;
};
const PaymentCard: FC<PaymentCardProps> = ({
  paymentMethod,
  defaultPaymentMethod,
}) => {
  const { handelSetDefaultPaymentMethod, handleDelete } = usePaymentCard();
  return (
    <div key={paymentMethod.id} className="bg-zinc-800 p-4 rounded-lg w-[30%]">
      <div className="flex gap-2 items-center text-lg">
        {" "}
        <CardBrand brand={paymentMethod.card.brand} />
        <div>
          <p>{paymentMethod.card.name}</p>
          <p>
            <span className="font-medium capitalize">
              {paymentMethod.card.brand}
            </span>{" "}
            ending in {paymentMethod.card.last4}
          </p>{" "}
        </div>
        {paymentMethod.id === defaultPaymentMethod && (
          <span className="border rounded-[25px] px-2 py-1 text-sm border-zinc-500 text-zinc-400">
            Default
          </span>
        )}
      </div>
      <div className="flex gap-2 items-center mt-2">
        {paymentMethod.id !== defaultPaymentMethod && (
          <Button
            onClick={() => handelSetDefaultPaymentMethod(paymentMethod.id)}
            className="bg-green-700 p-1 text-sm"
          >
            Set as Default
          </Button>
        )}

        <Button
          onClick={() => handleDelete(paymentMethod.id)}
          className="bg-red-700 p-1 text-sm"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PaymentCard;
