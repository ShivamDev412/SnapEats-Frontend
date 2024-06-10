import SearchLocation from "../SearchLocation";
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { AddressType } from "@/redux/slice/api/userSlice";
import { InputField, SelectField } from "../Input";
import Button from "../Button";
import { addressTypes } from "@/utils/Constants";

export type FormProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  getValues: UseFormGetValues<T>;
  errors: FieldErrors<T>;
  setValue: UseFormSetValue<T>;
  handleSubmit: UseFormHandleSubmit<T, undefined>;
  onSubmit: SubmitHandler<T>;
  isLoading: boolean;
  isUser?: boolean;
};

const AddAddress: React.FC<FormProps<AddressType>> = ({
  register,
  getValues,
  errors,
  setValue,
  handleSubmit,
  onSubmit,
  isLoading,
}) => {
  const isEdit = getValues("id") ? true : false;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h3 className="text-2xl font-semibold text-center">
        {isEdit ? "Update Address" : "Add New Address"}
      </h3>
      <div className="my-4 flex gap-4 flex-col">
        <InputField
          id={"apt"}
          label={"Apt (Optional)"}
          type={"text"}
          register={register}
          errors={errors}
          getValues={getValues}
        />
        <InputField
          id={"block"}
          label={"Block (Optional)"}
          type={"text"}
          register={register}
          errors={errors}
          getValues={getValues}
        />
        <SearchLocation
          id={"address"}
          label={"Your Location"}
          register={register}
          getValues={getValues}
          errors={errors}
          setValue={setValue}
        />
        <SelectField
          id={"type"}
          register={register}
          label={"Type"}
          errors={errors}
          options={[...addressTypes]}
          defaultValue={getValues("type") || addressTypes[0]?.value}
          getValues={getValues}
        />

        <Button type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AddAddress;
