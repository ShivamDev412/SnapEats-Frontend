import { UpdateUserType } from "@/redux/slice/api/user/profileSlice";
import { CgProfile } from "react-icons/cg";

import Button from "../Button";
import { FormProps } from "../ManageAddress/AddAddress";
import FileUpload from "../UploadFile";
import { StoreProfileData } from "@/redux/slice/api/store/profileSlice";
import { TextInput } from "../InputComponent";

const EditProfile: React.FC<FormProps<UpdateUserType | StoreProfileData>> = ({
  register,
  errors,
  onSubmit,
  handleSubmit,
  isLoading,
  isUser,
  control,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h3 className="text-2xl font-semibold text-center flex gap-1 mx-auto items-center justify-center"><CgProfile className="h-7 w-7"/>Edit Profile </h3>
      <div className="my-4 flex gap-4 flex-col">
        <FileUpload
          id={isUser ? "profilePicture" : "image"}
          register={register}
          errors={errors}
          control={control}
          className="rounded-full w-[2in] object-cover"
          title={isUser ? "Upload profile picture" : "Upload store picture"}
        />
        {isUser ? (
          <>
            <TextInput
              id="firstName"
              type="text"
              register={register}
              errors={errors}
              placeholder="Your first name"
            />
            <TextInput
              id="lastName"
              type="text"
              register={register}
              errors={errors}
              placeholder="Your last name"
            />
          </>
        ) : (
          <TextInput
            id="name"
            type="text"
            register={register}
            errors={errors}
            placeholder="Store Name"
          />
        )}
        <TextInput
          id="email"
          type="email"
          register={register}
          errors={errors}
          placeholder="Your email"
        />
        <Button type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default EditProfile;
