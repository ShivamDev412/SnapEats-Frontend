import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "@/Schema/AuthSchema";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/slice/authSlice";
import { useLoginMutation } from "@/redux/slice/api/authSlice";
import { setAccountType } from "@/redux/slice/accountSlice";
import useFormHandler from "@/Hooks/useFormHandler";
import { DEFAULT_VALUES } from "@/utils/Constants";
import useDeviceType from "@/Hooks/useDeviceType";

type LoginType = {
  email: string;
  password: string;
};
export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useDeviceType()
  type FormField = z.infer<typeof LoginSchema>;
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    clearErrors,
    formState: { errors },
    setError,
  } = useFormHandler<LoginType>(DEFAULT_VALUES.LOGIN, LoginSchema);
  const [login, { isLoading }] = useLoginMutation();
  const onSubmit: SubmitHandler<FormField> = async (credentials) => {
    try {
      const response = await login(credentials).unwrap();
      const { success, message, isStoreRegistered } = response;
      if (success) {
        Toast(message, "success");
        dispatch(setCredentials(response["auth-token"]));
        if (isStoreRegistered && !isMobile) {
          dispatch(setAccountType("STORE"));
          navigate(BROWSER_ROUTE.STORE_DASHBOARD);
        } else navigate(BROWSER_ROUTE.HOME);
        reset();
        clearErrors();
      }
    } catch (error: any) {
      const message = error.data?.message.toLowerCase();
      const type = message?.includes("password") ? "password" : "email";
      setError(type, {
        type: "manual",
        message: error.data?.message,
      });
    }
  };

  return { register, handleSubmit, onSubmit, errors, getValues, isLoading };
};
