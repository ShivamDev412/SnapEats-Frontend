import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import Toast from "@/utils/Toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "@/Schema/UserSchema";
import {
  ResetPasswordType,
  useResetPasswordMutation,
} from "@/redux/slice/api/userSlice";
import { ENDPOINTS } from "@/utils/Endpoints";

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
  } = useForm<ResetPasswordType>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(ResetPasswordSchema),
  });
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
