import SearchLocation from "../SearchLocation";
import {
  Control,
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { AddressType } from "@/redux/slice/api/userSlice";
import Button from "../Button";
import { addressTypes } from "@/utils/Constants";
import { TextInput, SelectField } from "../InputComponent";

export type FormProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  getValues: UseFormGetValues<T>;
  errors: FieldErrors<T>;
  setValue: UseFormSetValue<T>;
  handleSubmit: UseFormHandleSubmit<T, undefined>;
  onSubmit: SubmitHandler<T>;
  control:Control<T>
  isEdit?: boolean;
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
        <TextInput
          id="apt"
          type="text"
          register={register}
          errors={errors}
          placeholder="Apt (Optional)"
        />
        <TextInput
          id="block"
          type="text"
          register={register}
          errors={errors}
          placeholder="Block (Optional)"
        />
        <SearchLocation
          id={"address"}
          placeholder={"Search Address"}
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <SelectField
          id="type"
          register={register}
          placeholder="Type"
          errors={errors}
          data={addressTypes}
        />
        <Button type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default AddAddress;
