import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Toast from "@/utils/Toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordSchema } from "@/Schema/UserSchema";
import { ForgotPasswordType, useForgotPasswordMutation } from "@/redux/slice/api/user/profileSlice";

export const useForgotPassword = () => {
  type FormField = z.infer<typeof ForgotPasswordSchema>;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setError,
  } = useForm<ForgotPasswordType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const onSubmit: SubmitHandler<FormField> = async (credentials) => {
    try {
      const response = await forgotPassword(credentials).unwrap();
   
      const { success, message } = response;
      if (success) {
        Toast(message, "success");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError("email", {
        type: "manual",
        message: error.data?.message,
      });
    }
  };

  return { register, handleSubmit, onSubmit, errors, getValues, isLoading };
};
