import useAddNewAccount from "./useAddAccount";
import { t } from "i18next";
import { TextInput } from "../InputComponent";
import Button from "../Button";
const AddNewAccount = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { register, handleSubmit, errors, isLoading } = useAddNewAccount(handleCloseModal);
  return (
    <>
      <form
        className=" justify-center flex flex-col gap-4 w-full px-6"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl text-center font-semibold mb-5">
          {t("linkBankAccount")}
        </h3>
        <TextInput
          id="email"
          register={register}
          errors={errors}
          type="text"
          placeholder={t("email")}
        />
        <TextInput
          id="accountHolderName"
          register={register}
          errors={errors}
          type="text"
          placeholder={t("accountHolderName")}
        />
        <TextInput
          id="accountNumber"
          register={register}
          errors={errors}
          placeholder={t("accountNumber")}
          type="number"
        />
        <TextInput
          id="transitNumber"
          register={register}
          errors={errors}
          type="text"
          placeholder={t("transitNumber")}
        />
        <TextInput
          id="institutionNumber"
          register={register}
          errors={errors}
          type="text"
          placeholder={t("institutionNumber")}
        />
        <Button type="submit" isLoading={isLoading}>Add Account</Button>
      </form>
    </>
  );
};

export default AddNewAccount;
