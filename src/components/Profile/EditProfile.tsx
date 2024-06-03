import { UpdateUserType } from "@/redux/slice/api/userSlice";
import Button from "../Button";
import { InputField } from "../Input";
import { FormProps } from "../ManageAddress/AddAddress";
import FileUpload from "../UploadFile";

const EditProfile: React.FC<FormProps<UpdateUserType>> = ({
  register,
  errors,
  getValues,
  onSubmit,
  handleSubmit,
  isLoading,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h3 className="text-2xl font-semibold text-center">Edit Profile</h3>
      <div className="my-4 flex gap-4 flex-col">
        <FileUpload
          id={"profilePicture"}
          register={register}
          errors={errors}
          getValues={getValues}
          className="rounded-full w-[2in] object-cover"
          title={"Upload profile picture"}
        />
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
