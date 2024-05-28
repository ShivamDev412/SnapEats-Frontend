import Button from "@/components/Button";
import { InputField } from "@/components/Input";
import { CircularProgress, FormControl } from "@mui/material";
import { useResetPassword } from "./useResetPassword";
import Logo from "@/assets/logo.svg";

const ResetPassword = () => {
  const { register, handleSubmit, onSubmit, errors, getValues, isLoading } =
    useResetPassword();
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
          Reset Password
        </h2>
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
            "Reset Password"
          )}
        </Button>
      </FormControl>
    </main>
  );
};

export default ResetPassword;
