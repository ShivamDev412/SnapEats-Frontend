import Button from "../Button";
import { TextInput } from "../InputComponent";
import CardInput from "./CardInput";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import useAddPaymentMethod from "./useAddPaymentMethod";

const AddPaymentMethod = ({
    handleCloseModal,
  }: {
    handleCloseModal: () => void;
  }) => {
    const { register, errors, handleSubmit, onSubmit, isLoading } =
      useAddPaymentMethod(handleCloseModal);
    return (
      <div className="w-full">
        <h3 className="text-2xl font-semibold text-center">
          Add a New Payment Method
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
            placeholder="Name on Card"
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
            Save Card
          </Button>
        </form>
      </div>
    );
  };
  export default AddPaymentMethod