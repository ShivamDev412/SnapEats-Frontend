import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SignupSchema } from "@/Schema/AuthSchema";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCredentials } from "@/redux/slice/authSlice";
import { useSignupMutation } from "@/redux/slice/api/authSlice";
import { SignupType } from "@/redux/slice/api/authSlice";

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
  } = useForm<SignupType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(SignupSchema),
  });
  const [signup, { isLoading }] = useSignupMutation();
  const onSubmit: SubmitHandler<FormField> = async (credentials) => {
    //need to change according to signup
    //1need to fix catch block
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
