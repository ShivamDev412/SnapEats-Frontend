import Otp from "../OtpInput";
import Button from "../Button";
import useVerifyCredential from "./useVerifyCredentail";
import { useTranslation } from "react-i18next";
type Props = {
  phoneNumber?: string;
  handleCloseModal: () => void;
  type: "email" | "phoneNumber";
  email?: string;
};
const VerifyCredentials: React.FC<Props> = ({
  phoneNumber,
  email,
  handleCloseModal,
  type,
}) => {
  const {
    otp,
    setOtp,
    counter,
    isOtpSend,
    handleSendOtp,
    handleVerifyOTP,
    renderCounter,
    isLoading,
  } = useVerifyCredential(handleCloseModal);
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-lg md:text-xl font-bold">
        {t("verify")}{" "}
        {type === "email" ? <>{t("email")}</> : <>{t("phoneNumber")}</>}
      </h3>

      {isOtpSend ? (
        <>
          <p>
            {t("enter otp received on your")}{" "}
            {type === "email" ? <>{t("email")}</> : <>{t("phoneNumber")}</>}
          </p>{" "}
          <Otp
            separator={<span> </span>}
            value={otp}
            onChange={setOtp}
            length={6}
          />
          <div className="w-full flex justify-end">
            {" "}
            <Button
              className="px-2 py-1 text-sm"
              disabled={counter ? true : false}
              onClick={() =>
                handleSendOtp(
                  type === "email"
                    ? (email as string)
                    : (phoneNumber as string),
                  "resend",
                  type
                )
              }
            >
              {counter === 0 ? (
                <>{t("resendOTP")}</>
              ) : (
                <>
                  {t("resendIn")} {`${renderCounter(counter)} min`}
                </>
              )}
            </Button>
          </div>
          <Button
            onClick={() => handleVerifyOTP(type)}
            isLoading={isLoading}
            className="w-full"
          >
            {t("verifyOTP")}
          </Button>
        </>
      ) : (
        <>
          <p className="break-word">
            {t("you will receive an OTP on")}{" "}
            <span className="font-semibold">
              {type === "email" ? email : phoneNumber}{" "}
            </span>
            {t("on click of Send OTP button.")}
          </p>
          <Button
            onClick={() =>
              handleSendOtp(
                type === "email" ? (email as string) : (phoneNumber as string),
                "send",
                type
              )
            }
            className="w-full"
            isLoading={isLoading}
          >
            {t("sendOTP")}
          </Button>
        </>
      )}
    </div>
  );
};

export default VerifyCredentials;
