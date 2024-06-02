import { PhoneNumberType } from "@/redux/slice/api/userSlice";
import Button from "../Button";
import { InputField, SelectField } from "../Input";
import { FormProps } from "../ManageAddress/AddAddress";
import { countryCode } from "@/utils/Constants";

const AddPhoneNumber: React.FC<FormProps<PhoneNumberType>> = ({
  register,
  getValues,
  errors,
  handleSubmit,
  onSubmit,
  isLoading,
}) => {
  const isEdit = false;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h3 className="text-2xl font-semibold text-center">
        {isEdit ? "Update Phone Number" : "Add Phone Number"}
      </h3>
      <div className="my-4 flex gap-4 flex-col">
        <SelectField
          id={"countryCode"}
          register={register}
          label={"Country Code"}
          errors={errors}
          options={[...countryCode]}
          defaultValue={getValues("countryCode") || countryCode[0]?.value}
          getValues={getValues}
        />
        <InputField
          id={"phoneNumber"}
          label={"Phone Number"}
          type={"number"}
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

export default AddPhoneNumber;
