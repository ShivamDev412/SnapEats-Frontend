import Button from "../Button";
import { TextInput } from "../InputComponent";
import CardInput from "./CardInput";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import useAddPaymentMethod from "./useAddPaymentMethod";
import { useTranslation } from "react-i18next";

const AddPaymentMethod = ({
    handleCloseModal,
  }: {
    handleCloseModal: () => void;
  }) => {
    const { register, errors, handleSubmit, onSubmit, isLoading } =
      useAddPaymentMethod(handleCloseModal);
      const {t} = useTranslation();
    return (
      <div className="w-full">
        <h3 className="text-2xl font-semibold text-center">
          {t("addNewCard")}
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="my-4 flex gap-4 flex-col"
        >
          <TextInput
            id="name"
            type="text"
            register={register}
            errors={errors}
            placeholder={t("nameOnCard")}
          />
          <CardInput
            errors={errors}
            id={"cardNumber"}
            element={CardNumberElement}
          />
          <CardInput
            errors={errors}
            id={"expiryDate"}
            element={CardExpiryElement}
          />
          <CardInput errors={errors} id={"cvv"} element={CardCvcElement} />
  
          <Button type="submit" isLoading={isLoading}>
            {t("saveCard")}
          </Button>
        </form>
      </div>
    );
  };
  export default AddPaymentMethod