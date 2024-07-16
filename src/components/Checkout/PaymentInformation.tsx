import { PaymentMethodType } from "@/redux/slice/api/user/paymentSlice";
import Button from "../Button";
import { Link } from "react-router-dom";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { CardBrand } from "../PaymentMethods";
import { useTranslation } from "react-i18next";

const PaymentInformation = ({
  defaultPaymentMethod,
}: {
  defaultPaymentMethod: PaymentMethodType | undefined;
}) => {
  const { t } = useTranslation();
  return (
    <div className="bg-zinc-800 rounded-lg p-4 flex flex-col gap-4 w-full">
      <h3 className="text-2xl font-semibold">{t("paymentInfo")}</h3>
      {defaultPaymentMethod ? (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <CardBrand brand={defaultPaymentMethod.card.brand} />
            <div>
              <p>{defaultPaymentMethod.card.name}</p>
              <p>
                <span className="font-medium capitalize">
                  {defaultPaymentMethod.card.brand}
                </span>{" "}
                ending in {defaultPaymentMethod.card.last4}
              </p>{" "}
            </div>
          </div>
          <Button className="text-sm w-fit">
            <Link to={BROWSER_ROUTE.PAYMENT_METHODS}>{t("changeCard")}</Link>
          </Button>
        </div>
      ) : (
        <Button className="text-sm w-fit">
          <Link to={BROWSER_ROUTE.PAYMENT_METHODS}>{t("addNewCard")}</Link>
        </Button>
      )}
    </div>
  );
};

export default PaymentInformation;
