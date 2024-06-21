import { RiLockPasswordFill } from "react-icons/ri";
import useChangePasswordForm from "./useChangePasswordForm";
import { PasswordField } from "../InputComponent";
import { useTranslation } from "react-i18next";
import Button from "@/components/Button";

const ChangePasswordForm = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { register, handleSubmit, onSubmit, errors, isLoading } =
    useChangePasswordForm(handleCloseModal);
  const { t } = useTranslation();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h3 className="text-2xl font-semibold text-center flex gap-1 items-center justify-center">
        <RiLockPasswordFill className="h-7 w-7" />
        {t("changePassword")}
      </h3>
      <div className="my-4 flex gap-4 flex-col">
        <PasswordField
          id={"currentPassword"}
          register={register}
          errors={errors}
          placeholder={t("currentPassword")}
        />
        <PasswordField
          id={"newPassword"}
          register={register}
          errors={errors}
          placeholder={t("newPassword")}
        />
        <PasswordField
          id={"confirmNewPassword"}
          register={register}
          errors={errors}
          placeholder={t("confirmPassword")}
        />
        <Button type="submit" isLoading={isLoading}>
          {t("changePassword")}
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
