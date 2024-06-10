import { UpdateUserType } from "@/redux/slice/api/userSlice";
import Button from "../Button";
import { InputField } from "../Input";
import { FormProps } from "../ManageAddress/AddAddress";
import FileUpload from "../UploadFile";
import { StoreProfileData } from "@/redux/slice/api/storeSlice";

const EditProfile: React.FC<FormProps<UpdateUserType | StoreProfileData>> = ({
  register,
  errors,
  getValues,
  onSubmit,
  handleSubmit,
  isLoading,
  isUser,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h3 className="text-2xl font-semibold text-center">Edit Profile</h3>
      <div className="my-4 flex gap-4 flex-col">
        <FileUpload
          id={isUser ? "profilePicture" : "image"}
          register={register}
          errors={errors}
          getValues={getValues}
          className="rounded-full w-[2in] object-cover"
          title={isUser ? "Upload profile picture" : "Upload store picture"}
        />
        {isUser ? (
          <>
            <InputField
              id={"firstName"}
              label={"First Name"}
              type={"text"}
              register={register}
              errors={errors}
              getValues={getValues}
            />
            <InputField
              id={"lastName"}
              label={"Last Name"}
              type={"text"}
              register={register}
              errors={errors}
              getValues={getValues}
            />
          </>
        ) : (
          <InputField
            id={"name"}
            label={"Store Name"}
            type={"text"}
            register={register}
            errors={errors}
            getValues={getValues}
          />
        )}

        <InputField
          id={"email"}
          label={"Email"}
          type={"text"}
          register={register}
          errors={errors}
          getValues={getValues}
        />
        <Button type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default EditProfile;
