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
import { AddressType } from "@/redux/slice/api/user/addressSlice";
import Button from "../Button";
import { addressTypes } from "@/utils/Constants";
import { TextInput, SelectField } from "../InputComponent";
import { useTranslation } from "react-i18next";

export type FormProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  getValues: UseFormGetValues<T>;
  errors: FieldErrors<T>;
  setValue: UseFormSetValue<T>;
  handleSubmit: UseFormHandleSubmit<T, undefined>;
  onSubmit: SubmitHandler<T>;
  control: Control<T>;
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
  const { t } = useTranslation();
  const isEdit = getValues("id") ? true : false;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h3 className="text-2xl font-semibold text-center">
        {isEdit ? <>{t("updateAddress")}</> : <>{t("addNewAddress")}</>}
      </h3>
      <div className="my-4 flex gap-4 flex-col">
        <TextInput
          id="apt"
          type="text"
          register={register}
          errors={errors}
          placeholder={t('apt')}
        />
        <TextInput
          id="block"
          type="text"
          register={register}
          errors={errors}
          placeholder={t('block')}
        />
        <SearchLocation
          id={"address"}
          placeholder={t('searchAddress')}
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <SelectField
          id="type"
          register={register}
          placeholder={t('selectAddressType')}
          errors={errors}
          data={addressTypes}
        />
        <Button type="submit" isLoading={isLoading}>
          {isEdit ? <>{t("update")}</> : <>{t("add")}</>}
        </Button>
      </div>
    </form>
  );
};

export default AddAddress;
