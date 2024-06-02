import { AddressSchema } from "@/Schema/UserSchema";
import {
  AddressType,
  useCreateAddressMutation,
  useUpdateAddressMutation,
} from "@/redux/slice/api/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Toast from "@/utils/Toast";
import { z } from "zod";

const useManageAddress = () => {
  const [openModal, setOpenModal] = useState(false);
  type FormField = z.infer<typeof AddressSchema>;

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<AddressType>({
    defaultValues: {
      id: "",
      apt: "",
      block: "",
      address: "",
      type: "",
      lat: 0,
      lon: 0,
    },
    resolver: zodResolver(AddressSchema),
  });

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
    isUpdateAddressLoading,
  };
};

export default useManageAddress;
