import {
  useResendOTPMutation,
  useResentEmailOTPMutation,
  useSendEmailOTPMutation,
  useSendOTPMutation,
  useVerifyEmailOTPMutation,
  useVerifyOTPMutation,
} from "@/redux/slice/api/userSlice";
import { useEffect, useState } from "react";
import Toast from "@/utils/Toast";

const useVerifyCredential = (handleCloseModal: () => void) => {
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(120);
  const [isOtpSend, setIsOtpSend] = useState(false);
  useEffect(() => {
    if (!isOtpSend || counter === 0) return;
    const timer = setTimeout(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [counter, isOtpSend]);
  const [sendOTP, { isLoading }] = useSendOTPMutation();
  const [verifyOTP, { isLoading: isVerifyOTPLoading }] = useVerifyOTPMutation();
  const [resendOTP] = useResendOTPMutation();
  const [sendEmailOtp, { isLoading: isSendEmailLoading }] =
    useSendEmailOTPMutation();
  const [verifyEmailOTP, { isLoading: isVerifyEmailOTPLoading }] =
    useVerifyEmailOTPMutation();
  const [resendEmailOTP] =
    useResentEmailOTPMutation();
  const handleSendOtp = async (
    credential: string,
    type: string,
    credType: string
  ) => {
    try {
      const res =
        credType === "email"
          ? type === "send"
            ? await sendEmailOtp({ email: credential }).unwrap()
            : await resendEmailOTP({ email: credential }).unwrap()
          : type === "send"
          ? await sendOTP({ phoneNumber: credential }).unwrap()
          : await resendOTP({ phoneNumber: credential }).unwrap();
      if (res.success) {
        Toast(res.message, "success");
        setCounter(120);
        setIsOtpSend(true);
      }
    } catch (error: any) {
      Toast(error.data.message, "error");
    }
  };
  const handleVerifyOTP = async (credType: string) => {
    try {
      const res =
        credType === "email"
          ? await verifyEmailOTP({ otp }).unwrap()
          : await verifyOTP({ otp }).unwrap();
      if (res.success) {
        Toast(res.message, "success");
        handleCloseModal();
      }
    } catch (error: any) {
      Toast(error.data.message, "error");
    }
  };
  const renderCounter = (counter: number) => {
    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
  return {
    otp,
    setOtp,
    counter,
    isOtpSend,
    handleSendOtp,
    verifyOTP,
    isLoading,
    handleVerifyOTP,
    renderCounter,
    isVerifyOTPLoading,
    isSendEmailLoading,
    isVerifyEmailOTPLoading,
  };
};
export default useVerifyCredential;
