/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useResendOTPMutation,
  useResentEmailOTPMutation,
  useSendEmailOTPMutation,
  useSendOTPMutation,
  useVerifyEmailOTPMutation,
  useVerifyOTPMutation,
} from "@/redux/slice/api/user/profileSlice";
import { useEffect, useState } from "react";
import Toast from "@/utils/Toast";
import {
  useResendStorePhoneNumberOTPMutation,
  useResentStoreEmailOTPMutation,
  useSendStoreEmailOTPMutation,
  useSendStorePhoneNumberOTPMutation,
  useVerifyStoreEmailOTPMutation,
  useVerifyStorePhoneNumberOTPMutation,
} from "@/redux/slice/api/store/profileSlice";
import useAccountType from "@/Hooks/useAccountType";

const useVerifyCredential = (handleCloseModal: () => void) => {
  const [otp, setOtp] = useState("");
  const isUser = useAccountType();
  const [counter, setCounter] = useState(120);
  const [isOtpSend, setIsOtpSend] = useState(false);
  useEffect(() => {
    if (!isOtpSend || counter === 0) return;
    const timer = setTimeout(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [counter, isOtpSend]);
  //* User Phone Number
  const [sendOTP, { isLoading: isSendOTPLoading }] = useSendOTPMutation();
  const [verifyOTP, { isLoading: isVerifyOTPLoading }] = useVerifyOTPMutation();
  const [resendOTP] = useResendOTPMutation();
  //* User Email
  const [sendEmailOtp, { isLoading: isSendEmailLoading }] =
    useSendEmailOTPMutation();
  const [verifyEmailOTP, { isLoading: isVerifyEmailOTPLoading }] =
    useVerifyEmailOTPMutation();
  const [resendEmailOTP] = useResentEmailOTPMutation();
  //* Store Phone Number
  const [sendStorePhoneOtp, { isLoading: isStorePhoneNumberOTPLoading }] =
    useSendStorePhoneNumberOTPMutation();
  const [
    resendStorePhoneOtp,
    { isLoading: isVerifyStorePhoneResendOTPLoading },
  ] = useResendStorePhoneNumberOTPMutation();
  const [verifyStorePhoneOtp, { isLoading: isVerifyStorePhoneOTPLoading }] =
    useVerifyStorePhoneNumberOTPMutation();
  //* Store Email
  const [sendStoreEmailOtp, { isLoading: isStoreEmailOTPLoading }] =
    useSendStoreEmailOTPMutation();
  const [verifyStoreEmailOtp, { isLoading: isVerifyStoreEmailOTPLoading }] =
    useVerifyStoreEmailOTPMutation();
  const [resendStoreEmailOTP, { isLoading: isResentStoreEmailOTPLoading }] =
    useResentStoreEmailOTPMutation();

  const isLoading =
    isSendOTPLoading ||
    isVerifyOTPLoading ||
    isVerifyEmailOTPLoading ||
    isSendEmailLoading ||
    isVerifyStorePhoneOTPLoading ||
    isVerifyStorePhoneResendOTPLoading ||
    isStorePhoneNumberOTPLoading ||
    isStoreEmailOTPLoading ||
    isResentStoreEmailOTPLoading ||
    isVerifyStoreEmailOTPLoading;
  const handleSendOtp = async (
    credential: string,
    type: string,
    credType: string
  ) => {
    try {
      const res = isUser
        ? credType === "email"
          ? type === "send"
            ? await sendEmailOtp({ email: credential }).unwrap()
            : await resendEmailOTP({ email: credential }).unwrap()
          : type === "send"
          ? await sendOTP({ phoneNumber: credential }).unwrap()
          : await resendOTP({ phoneNumber: credential }).unwrap()
        : credType === "email"
        ? type === "send"
          ? await sendStoreEmailOtp({ email: credential }).unwrap()
          : await resendStoreEmailOTP({ email: credential }).unwrap()
        : type === "send"
        ? await sendStorePhoneOtp({ phoneNumber: credential }).unwrap()
        : await resendStorePhoneOtp({ phoneNumber: credential }).unwrap();

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
      const res = isUser
        ? credType === "email"
          ? await verifyEmailOTP({ otp }).unwrap()
          : await verifyOTP({ otp }).unwrap()
        : credType === "email"
        ? await verifyStoreEmailOtp({ otp }).unwrap()
        : await verifyStorePhoneOtp({ otp }).unwrap();
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
    handleVerifyOTP,
    renderCounter,
    isLoading,
  };
};
export default useVerifyCredential;
