import { z } from "zod";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { AddressSchema } from "@/Schema/UserSchema";
import {
  AddressType,
  useCreateAddressMutation,
  useUpdateAddressMutation,
} from "@/redux/slice/api/user/addressSlice";
import Toast from "@/utils/Toast";
import { DEFAULT_VALUES } from "@/utils/Constants";
import useFormHandler from "@/Hooks/useFormHandler";

const useManageAddress = () => {
  const [openModal, setOpenModal] = useState(false);
  type FormField = z.infer<typeof AddressSchema>;
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useFormHandler<AddressType>(DEFAULT_VALUES.ADDRESS, AddressSchema);

  const handleCloseModal = () => {
    setOpenModal(false);
    reset();
  };
  const handleAddAddress = () => {
    setOpenModal(true);
  };
  const handleUpdateAddress = (address: AddressType) => {
    setValue("apt", address.apt);
    setValue("block", address.block);
    setValue("address", address.address);
    setValue("type", address.type);
    setValue("lat", address.lat);
    setValue("lon", address.lon);
    setValue("id", address.id);
    setOpenModal(true);
  };
  const [createAddress, { isLoading }] = useCreateAddressMutation();
  const [updateAddress, { isLoading: isUpdateAddressLoading }] =
    useUpdateAddressMutation();
  const onSubmit: SubmitHandler<FormField> = async (credentials) => {
    try {
      const res = getValues("id")
        ? await updateAddress({
            data: credentials,
            id: getValues("id") as string,
          })
        : await createAddress(credentials);
      if (res?.data?.success) {
        handleCloseModal();
        Toast(res.data.message, "success");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast(error.message, "error");
    }
  };
  return {
    openModal,
    handleCloseModal,
    handleAddAddress,
    onSubmit,
    register,
    handleSubmit,
    getValues,
    errors,
    setValue,
    isLoading,
    handleUpdateAddress,
    control,
    isUpdateAddressLoading,
  };
};

export default useManageAddress;
