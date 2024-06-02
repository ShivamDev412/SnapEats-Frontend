import { PhoneNumberSchema } from "@/Schema/UserSchema";
import {
  PhoneNumberType,
  useUpdatePhoneNumberMutation,
} from "@/redux/slice/api/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Toast from "@/utils/Toast";
import { z } from "zod";

const useAdditionalDetails = () => {
  const [modalOperation, setModalOperation] = useState<
    "phoneNumber" | "verifyPhoneNumber" | ""
  >("");
  const [openModal, setOpenModal] = useState(false);
  type FormField = z.infer<typeof PhoneNumberSchema>;
  const [updatePhoneNumber, { isLoading }] = useUpdatePhoneNumberMutation();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<PhoneNumberType>({
    defaultValues: {
      countryCode: "",
      phoneNumber: "",
    },
    resolver: zodResolver(PhoneNumberSchema),
  });
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
      const res = await updatePhoneNumber(dataToSend).unwrap();
      if (res.success) {
        Toast(res.message, "success");
        handleCloseModal();
        reset();
      }
    } catch (err: any) {
      Toast(err.data.message, "error");
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
    modalOperation,
  };
};
export default useAdditionalDetails;
