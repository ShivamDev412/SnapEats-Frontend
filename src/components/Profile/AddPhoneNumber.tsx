import { PhoneNumberType } from "@/redux/slice/api/userSlice";
import { MdOutlinePhoneIphone } from "react-icons/md";

import Button from "../Button";
import { FormProps } from "../ManageAddress/AddAddress";
import { countryCode } from "@/utils/Constants";
import { SelectField, TextInput } from "../InputComponent";

const AddPhoneNumber: React.FC<FormProps<PhoneNumberType>> = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  isEdit,
  isLoading,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h3 className="text-2xl font-semibold text-center flex gap-1 items-center justify-center">
        <MdOutlinePhoneIphone className="h-7 w-7" />
        {isEdit ? "Update Phone Number" : "Add Phone Number"}
      </h3>
      <div className="my-4 flex gap-4 flex-col">
        <SelectField
          id="countryCode"
          register={register}
          placeholder="Country Code"
          errors={errors}
          data={countryCode}
        />
        <TextInput
          id="phoneNumber"
          type="number"
          register={register}
          errors={errors}
          placeholder="Phone Number"
        />

        <Button type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AddPhoneNumber;
