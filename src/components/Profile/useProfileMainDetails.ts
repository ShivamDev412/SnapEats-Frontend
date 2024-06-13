import { z } from "zod";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { UpdateProfileSchema } from "@/Schema/UserSchema";
import {
  UpdateUserType,
  useUpdateUserMutation,
} from "@/redux/slice/api/userSlice";
import Toast from "@/utils/Toast";
import { DEFAULT_VALUES } from "@/utils/Constants";
import useFormHandler from "@/Hooks/useFormHandler";
import { UpdateStoreProfileSchema } from "@/Schema/Store.Schema";
import { StoreProfileData, useUpdateStoreMutation } from "@/redux/slice/api/storeSlice";
import useAccountType from "@/Hooks/useAccountType";

const useProfileMainDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContentType, setModalContentType] = useState("");
  type UserFormField = z.infer<typeof UpdateProfileSchema>;
  type StoreFormField = z.infer<typeof UpdateStoreProfileSchema>;
  const [updateUser, { isLoading:isUserUpdateLoading }] = useUpdateUserMutation();
  const [updateStore, { isLoading: isStoreUpdateLoading }] = useUpdateStoreMutation();
  const isLoading = isUserUpdateLoading || isStoreUpdateLoading;
  const isUser = useAccountType();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
    setError,
    control,
  } = useFormHandler<UpdateUserType | StoreProfileData>(
    isUser
      ? DEFAULT_VALUES.USER_PRIMARY_DATA
      : DEFAULT_VALUES.STORE_PRIMARY_DATA,
    isUser ? UpdateProfileSchema : UpdateStoreProfileSchema
  );

  const handleCloseModal = () => {
    setModalContentType("");
    reset();
    setOpenModal(false);
  };
  const verifyEmail = () => {
    setModalContentType("verifyEmail");
    setOpenModal(true);
  };
  const updateProfile = (name: string, email: string, profileImage: string) => {
    if(isUser) {
      const nameParts = name.split(" ");
      const firstName = nameParts.slice(0, -1).join(" ");
      const lastName = nameParts.slice(-1)[0];
      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("profilePicture", profileImage ? profileImage : "");
    } else {
      setValue("name", name);
      setValue("image", profileImage ? profileImage : "");
    }
    setValue("email", email);
    setModalContentType("updateProfile");
    setOpenModal(true);
  };
  const onSubmit: SubmitHandler<UserFormField | StoreFormField> = async (credentials) => {
    const { profilePicture, firstName, lastName, email } = credentials as UserFormField;
    const {name, image, email:storeEmail} = credentials as StoreFormField;
    const data = new FormData();
    if(isUser) {
      data.append(
        "profilePicture",
        typeof profilePicture[0] === "object" ? profilePicture[0] : profilePicture
      );
      data.append("firstName", firstName);
      data.append("lastName", lastName);
      data.append("email", email);
    } else {
      data.append(
        "image",
        typeof image[0] === "object" ? image[0] : image
      );
      data.append("name", name);
      data.append("email", storeEmail);
    }
  
    try {
      const res = isUser? await updateUser(data).unwrap(): await updateStore(data).unwrap();
      if (res.success) {
        handleCloseModal();
        Toast(res.message, "success");
        reset();
      }
    } catch (error: any) {
      Toast(error?.data?.message, "error");
    }
  };
  return {
    openModal,
    handleCloseModal,
    verifyEmail,
    modalContentType,
    register,
    handleSubmit,
    getValues,
    setValue,
    errors,
    setError,
    onSubmit,
    isLoading,
    updateProfile,
    isUser,
    control,
  };
};
export default useProfileMainDetails;
