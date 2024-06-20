import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Button from "@/components/Button";
import AuthWrapper from "@/Wrappers/AuthWrapper";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { useLogin } from "./useLogin";
import Logo from "@/assets/logo.svg";
import { TextInput, PasswordField } from "@/components/InputComponent";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { register, handleSubmit, onSubmit, errors, isLoading } = useLogin();
  const { t } = useTranslation();
  return (
    <AuthWrapper>
      <form
        className="w-full lg:w-8/12 bg-white rounded-md text-zinc-900 h-full lg:h-fit justify-center flex flex-col gap-4 "
        style={{ padding: "2rem" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="h-auto w-[2.5in] mx-auto">
          <img src={Logo} alt="brand_logo" className="w-full h-full" />
        </div>
        <h2 className="text-4xl text-center font-semibold mb-5">
          {t("LogIn")}
        </h2>
        <TextInput
          id="email"
          type="email"
          register={register}
          errors={errors}
          placeholder={t("yourEmail")}
        />
        <PasswordField
          id={"password"}
          register={register}
          errors={errors}
          placeholder={t("yourPassword")}
        />
        <div className="flex justify-between">
          <Link to={BROWSER_ROUTE.FORGOT_PASSWORD}>{t("forgotPassword")}</Link>
        </div>

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          className="w-full my-2"
        >
          {isLoading ? (
            <CircularProgress size={28} color="secondary" thickness={5} />
          ) : (
            <>{t("login")}</>
          )}
        </Button>
        <p className="text-right font-medium">
          {t("dontHaveAccount")}{" "}
          <Link to={BROWSER_ROUTE.SIGNUP} className="text-primary">
            {t("signup")}
          </Link>
        </p>
      </form>
    </AuthWrapper>
  );
};

export default Login;
