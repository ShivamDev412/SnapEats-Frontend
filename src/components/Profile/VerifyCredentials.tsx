import OTP from "../OtpInput";
import Button from "../Button";
import useVerifyCredential from "./useVerifyCredentail";
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
    isVerifyOTPLoading,
    isSendEmailLoading,
    isVerifyEmailOTPLoading,
  } = useVerifyCredential(handleCloseModal);

  return (
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-lg md:text-xl font-bold">
        Verify {type === "email" ? "Email" : "Phone Number"}
      </h3>

      {isOtpSend ? (
        <>
          <p>
            Enter OPT you received on your{" "}
            {type === "email" ? "Email" : "Phone Number"}
          </p>{" "}
          <OTP
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
              {counter === 0
                ? "Resend OTP"
                : `Resend in ${renderCounter(counter)} min`}
            </Button>
          </div>
          <Button
            onClick={() => handleVerifyOTP(type)}
            isLoading={isVerifyOTPLoading || isVerifyEmailOTPLoading}
            className="w-full"
          >
            Verify OTP
          </Button>
        </>
      ) : (
        <>
          <p className="break-word">
            You will receive an OTP on{" "}
            <span className="font-semibold">{type === "email" ? email : phoneNumber} </span>
            on click of Send OTP button.
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
            isLoading={isLoading || isSendEmailLoading}
          >
            Send OTP
          </Button>
        </>
      )}
    </div>
  );
};

export default VerifyCredentials;
