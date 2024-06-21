import useFormHandler from "@/Hooks/useFormHandler";
import { ChangePasswordSchema } from "@/Schema/UserSchema";
import {
  ChangePasswordType,
  useChangePasswordMutation,
} from "@/redux/slice/api/user/settingsSlice";
import { DEFAULT_VALUES } from "@/utils/Constants";
import Toast from "@/utils/Toast";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

type FormField = z.infer<typeof ChangePasswordSchema>;
const useChangePasswordForm = (handleCloseModal: () => void) => {
  const [changePassword, {isLoading}] = useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormHandler<ChangePasswordType>(
    DEFAULT_VALUES.CHANGE_PASSWORD,
    ChangePasswordSchema
  );
  const onSubmit: SubmitHandler<FormField> = async (credentials) => {
    try {
      const res = await changePassword(credentials).unwrap();
      if (res.success) {
        Toast(res.message, "success");
        handleCloseModal();
        reset();
        clearErrors();
      }
    } catch (error: any) {
      const message = error?.data.message;
      if (message === "Your current password is incorrect") {
        setError("currentPassword", {
          type: "manual",
          message: "Your current password is incorrect",
        });
      } else {
        Toast(message, "error");
      }
    }
  };
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
  };
};
export default useChangePasswordForm;
