import { PhoneNumberSchema } from "@/Schema/UserSchema";
import {
  PhoneNumberType,
  useUpdatePhoneNumberMutation,
} from "@/redux/slice/api/userSlice";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Toast from "@/utils/Toast";
import { z } from "zod";
import { DEFAULT_VALUES } from "@/utils/Constants";
import useFormHandler from "@/Hooks/useFormHandler";
import { useUpdateStorePhoneNumberMutation } from "@/redux/slice/api/storeSlice";
import useAccountType from "@/Hooks/useAccountType";

const useAdditionalDetails = () => {
  const isUser = useAccountType();
  const [modalOperation, setModalOperation] = useState<
    "phoneNumber" | "verifyPhoneNumber" | ""
  >("");
  const [openModal, setOpenModal] = useState(false);
  type FormField = z.infer<typeof PhoneNumberSchema>;
  const [updatePhoneNumber, { isLoading }] = useUpdatePhoneNumberMutation();
  const [updateStorePhoneNumber, { isLoading: updateStorePhoneNumberLoading }] =
    useUpdateStorePhoneNumberMutation();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useFormHandler<PhoneNumberType>(
    DEFAULT_VALUES.PHONE_NUMBER,
    PhoneNumberSchema
  );

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalOperation("");
    reset();
  };
  const addPhoneNumber = () => {
    setModalOperation("phoneNumber");
    setOpenModal(true);
  };
  const handleUpdatePhoneNumber = (data: {
    countryCode: string;
    phoneNumber: string;
  }) => {
    setModalOperation("phoneNumber");
    setValue("countryCode", data.countryCode);
    setValue("phoneNumber", data.phoneNumber);
    setOpenModal(true);
  };
  const onSubmit: SubmitHandler<FormField> = async (credentials) => {
    const dataToSend = {
      countryCode: credentials.countryCode as string,
      phoneNumber: credentials.phoneNumber as string,
    };
    try {
      const res = isUser
        ? await updatePhoneNumber(dataToSend).unwrap()
        : await updateStorePhoneNumber(dataToSend).unwrap();
      if (res.success) {
        Toast(res.message, "success");
        handleCloseModal();
        reset();
      }
    } catch (err: any) {
      Toast(err?.data?.message, "error");
    }
  };
  const verifyPhoneNumber = () => {
    setModalOperation("verifyPhoneNumber");
    setOpenModal(true);
  };
  return {
    openModal,
    handleCloseModal,
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    getValues,
    setValue,
    isLoading,
    addPhoneNumber,
    handleUpdatePhoneNumber,
    verifyPhoneNumber,
    control,
    modalOperation,
    updateStorePhoneNumberLoading
  };
};
export default useAdditionalDetails;
