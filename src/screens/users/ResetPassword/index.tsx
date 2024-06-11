import Button from "@/components/Button";
import { CircularProgress } from "@mui/material";
import { useResetPassword } from "./useResetPassword";
import Logo from "@/assets/logo.svg";
import { PasswordField } from "@/components/InputComponent";

const ResetPassword = () => {
  const { register, handleSubmit, onSubmit, errors, isLoading } =
    useResetPassword();
  return (
    <main className="bg-zinc-900 text-zinc-100 flex justify-center items-center h-screen">
      <form
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
        <PasswordField
          id={"password"}
          register={register}
          errors={errors}
          placeholder="Your New Password"
        />
        <PasswordField
          id={"confirmPassword"}
          register={register}
          errors={errors}
          placeholder="Confirm Password"
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          className="w-full my-2"
        >
          {isLoading ? (
            <CircularProgress size={28} color="secondary" thickness={5} />
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </main>
  );
};

export default ResetPassword;
