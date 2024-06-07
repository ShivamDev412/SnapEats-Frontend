import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginSchema } from "@/Schema/AuthSchema";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCredentials } from "@/redux/slice/authSlice";
import { useLoginMutation } from "@/redux/slice/api/authSlice";

type LoginType = {
  email: string;
  password: string;
};
export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  type FormField = z.infer<typeof LoginSchema>;

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    getValues,
    formState: { errors },
    setError,
  } = useForm<LoginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });
  const [login, {isLoading}] = useLoginMutation();
  const onSubmit: SubmitHandler<FormField> = async (credentials) => {
    try {
     
      const response = await login(credentials).unwrap();
      const { success, message } = response;
      if (success) {
        Toast(message, "success");
        dispatch(setCredentials(response["auth-token"]));
        navigate(BROWSER_ROUTE.HOME);
        reset();
        clearErrors();
      }
    } catch (error:any) {
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
