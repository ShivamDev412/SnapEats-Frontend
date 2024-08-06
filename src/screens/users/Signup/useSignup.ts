import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SignupSchema } from "@/Schema/AuthSchema";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/slice/authSlice";
import { useSignupMutation } from "@/redux/slice/api/user/authSlice";
import { SignupType } from "@/redux/slice/api/user/authSlice";
import { DEFAULT_VALUES } from "@/utils/Constants";
import useFormHandler from "@/Hooks/useFormHandler";

export const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  type FormField = z.infer<typeof SignupSchema>;
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    getValues,
    formState: { errors },
    setError,
  } = useFormHandler<SignupType>(DEFAULT_VALUES.SIGNUP, SignupSchema);

  const [signup, { isLoading }] = useSignupMutation();
  const onSubmit: SubmitHandler<FormField> = async (credentials) => {
    try {
      const response = await signup(credentials).unwrap();
      const { success, message } = response;
      if (success) {
        Toast(message, "success");
        dispatch(setCredentials(response["auth-token"]));
        navigate(BROWSER_ROUTE.HOME);
        reset();
        clearErrors();
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error.data?.message;
      const type = message.includes("Password") ? "password" : "email";
      setError(type, {
        type: "manual",
        message: error.data?.message,
      });
    }
  };

  return { register, handleSubmit, onSubmit, errors, getValues, isLoading };
};
