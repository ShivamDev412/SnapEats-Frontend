import { Link } from "react-router-dom";
import Button from "@/components/Button";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { CircularProgress } from "@mui/material";
import { useForgotPassword } from "./useForgotPasssword";
import Logo from "@/assets/logo.svg";
import { TextInput } from "@/components/InputComponent";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { register, handleSubmit, onSubmit, errors, isLoading } =
    useForgotPassword();
  const { t } = useTranslation();
  return (
    <main className="bg-zinc-900 text-zinc-100 flex justify-center items-center h-screen">
      <form
        className="w-full lg:w-1/3 bg-white rounded-md text-zinc-900 h-full lg:h-fit justify-center gap-4 "
        style={{ padding: "2rem" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="h-auto w-[2.5in] mx-auto">
          <img src={Logo} alt="brand_logo" className="w-full h-full" />
        </div>
        <h2 className="text-4xl text-center font-semibold mb-5">
          {t("forgotPassword")}
        </h2>
        <TextInput
          id="email"
          type="email"
          register={register}
          errors={errors}
          placeholder={t("yourEmail")}
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
            <>{t("sendResetLink")}</>
          )}
        </Button>
        <p className="text-right font-medium">
          {t("rememberYourPassword")}{" "}
          <Link to={BROWSER_ROUTE.LOGIN} className="text-primary">
            {t("login")}
          </Link>
        </p>
      </form>
    </main>
  );
};

export default ForgotPassword;
