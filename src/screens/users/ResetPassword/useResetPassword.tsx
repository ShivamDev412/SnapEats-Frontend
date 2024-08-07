import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import Toast from "@/utils/Toast";
import { ResetPasswordSchema } from "@/Schema/UserSchema";
import {
  ResetPasswordType,
  useResetPasswordMutation,
} from "@/redux/slice/api/user/profileSlice";
import { ENDPOINTS } from "@/utils/Endpoints";
import { DEFAULT_VALUES } from "@/utils/Constants";
import useFormHandler from "@/Hooks/useFormHandler";

export const useResetPassword = () => {
  const navigation = useNavigate();
  const params = useParams();
  const { token } = params;
  type FormField = z.infer<typeof ResetPasswordSchema>;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useFormHandler<ResetPasswordType>(
    DEFAULT_VALUES.RESET_PASSWORD,
    ResetPasswordSchema
  );

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const onSubmit: SubmitHandler<FormField> = async (credentials) => {
    try {
      const response = await resetPassword({
        ...credentials,
        token: token as string,
      }).unwrap();

      const { success, message } = response;
      if (success) {
        Toast(message, "success");
        navigation(ENDPOINTS.LOGIN);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.data.message.toLowerCase();
      if (
        errorMessage.includes("token") ||
        errorMessage.includes("expired") ||
        errorMessage.includes("invalid")
      ) {
        Toast(error.data.message, "error");
      } else {
        const type = error.data.message.includes("Password")
          ? "password"
          : "confirmPassword";
        setError(type, {
          type: "manual",
          message: error.data?.message,
        });
      }
    }
  };

  return { register, handleSubmit, onSubmit, errors, getValues, isLoading };
};
