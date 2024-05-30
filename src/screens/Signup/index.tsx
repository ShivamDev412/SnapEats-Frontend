import { Link } from "react-router-dom";
import { CircularProgress, FormControl } from "@mui/material";
import Button from "@/components/Button";
import AuthWrapper from "@/Wrappers/AuthWrapper";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { InputField } from "@/components/Input";
import { useSignup } from "./useSignup";
import Logo from "@/assets/logo.svg";

const Signup = () => {
  const { register, handleSubmit, onSubmit, errors, getValues, isLoading } =
    useSignup();
  return (
    <AuthWrapper>
      <FormControl
        component="form"
        className="w-full lg:w-8/12 bg-white rounded-md text-zinc-900 h-full lg:h-[70%] justify-center gap-4 "
        style={{ padding: "2rem" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="h-auto w-[2.5in] mx-auto">
          <img src={Logo} alt="brand_logo" className="w-full h-full" />
        </div>
        <h2 className="text-4xl text-center font-semibold mb-5">Sign Up</h2>
        <InputField
          id={"email"}
          label={"Email"}
          type={"text"}
          register={register}
          errors={errors}
          getValues={getValues}
        />
        <InputField
          id={"password"}
          label={"Password"}
          type={"password"}
          register={register}
          errors={errors}
          getValues={getValues}
        />
        <InputField
          id={"confirmPassword"}
          label={"Confirm Password"}
          type={"password"}
          register={register}
          errors={errors}
          getValues={getValues}
        />

        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? (
            <CircularProgress size={28} color="secondary" thickness={5} />
          ) : (
            "Signup"
          )}
        </Button>
        <p className="text-right font-medium">
          Already have an account?{" "}
          <Link to={BROWSER_ROUTE.LOGIN} className="text-primary">
            Login
          </Link>
        </p>
      </FormControl>
    </AuthWrapper>
  );
};

export default Signup;
