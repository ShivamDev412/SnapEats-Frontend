import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateProfileSchema } from "@/Schema/UserSchema";
import {
  UpdateUserType,
  useUpdateUserMutation,
} from "@/redux/slice/api/userSlice";
import Toast from "@/utils/Toast";
const useProfileMainDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContentType, setModalContentType] = useState("");

  type FormField = z.infer<typeof UpdateProfileSchema>;
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
    setError,
  } = useForm<UpdateUserType>({
    defaultValues: {
      profilePicture: "",
      firstName: "",
      lastName: "",
      email: "",
    },
    resolver: zodResolver(UpdateProfileSchema),
  });
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
    const nameParts = name.split(" ");
    const firstName = nameParts.slice(0, -1).join(" ");
    const lastName = nameParts.slice(-1)[0];
    setValue("firstName", firstName);
    setValue("lastName", lastName);
    setValue("email", email);
    setValue("profilePicture", profileImage ? profileImage : "");
    setModalContentType("updateProfile");
    setOpenModal(true);
  };
  const onSubmit: SubmitHandler<FormField> = async (credentials) => {
    const { profilePicture, firstName, lastName, email } = credentials;
    const data = new FormData();
    data.append(
      "profilePicture",
      typeof profilePicture[0] === "object" ? profilePicture[0] : profilePicture
    );
    data.append("firstName", firstName);
    data.append("lastName", lastName);
    data.append("email", email);
    try {
      const res = await updateUser(data).unwrap();
      if (res.success) {
        handleCloseModal();
        Toast(res.message, "success");
        reset();
      }
    } catch (error: any) {
      Toast(error.data.message, "error");
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
  };
};
export default useProfileMainDetails;
