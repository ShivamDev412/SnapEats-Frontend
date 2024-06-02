import { Link } from "react-router-dom";
import Button from "@/components/Button";
import { InputField } from "@/components/Input";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { CircularProgress, FormControl } from "@mui/material";
import { useForgotPassword } from "./useForgotPasssword";
import Logo from "@/assets/logo.svg";

const ForgotPassword = () => {
  const { register, handleSubmit, onSubmit, errors, getValues, isLoading } =
    useForgotPassword();
  return (
    <main className="bg-zinc-900 text-zinc-100 flex justify-center items-center h-screen">
      <FormControl
        component="form"
        className="w-full lg:w-1/3 bg-white rounded-md text-zinc-900 h-full lg:h-[70%] justify-center gap-4 "
        style={{ padding: "2rem" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="h-auto w-[2.5in] mx-auto">
          <img src={Logo} alt="brand_logo" className="w-full h-full" />
        </div>
        <h2 className="text-4xl text-center font-semibold mb-5">
          Forgot Password
        </h2>
        <InputField
          id={"email"}
          label={"Email"}
          type={"text"}
          register={register}
          errors={errors}
          getValues={getValues}
        />
        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? (
            <CircularProgress size={28} color="secondary" thickness={5} />
          ) : (
            "Send Reset Link"
          )}
        </Button>
        <p className="text-right font-medium">
          Remember your password?{" "}
          <Link to={BROWSER_ROUTE.LOGIN} className="text-primary">
            Login
          </Link>
        </p>
      </FormControl>
    </main>
  );
};

export default ForgotPassword;
