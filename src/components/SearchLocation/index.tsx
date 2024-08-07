import { FC } from "react";
import { useSearchLocation } from "./useSearchLocation";
import LocationDropdown from "@/components/LocationDropdown";
import { TextInput } from "../InputComponent";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { StoreRegisterType } from "@/redux/slice/api/store/profileSlice";

type SearchLocationProps = {
  register: UseFormRegister<StoreRegisterType>;
  errors:  FieldErrors<StoreRegisterType>;
  placeholder: string;
  setValue: UseFormSetValue<StoreRegisterType>;
  id: string;
};
const SearchLocation: FC<SearchLocationProps> = ({
  register,
  errors,
  setValue,
  placeholder,
  id,
}) => {
  const {
    placePredictions,
    isPlacePredictionsLoading,
    handleLocationSelect,
    showLocationDropdown,
    onChangeHandler,
  } = useSearchLocation(setValue, id);
  return (
    <div className="relative w-full">
      <TextInput
        id="address"
        type="text"
        register={register}
        onChange={onChangeHandler}
        errors={errors}
        placeholder={placeholder}
      />

      {showLocationDropdown && (
        <LocationDropdown
          placePredictions={placePredictions}
          isPlacePredictionsLoading={isPlacePredictionsLoading}
          handleLocationSelect={handleLocationSelect}
          className="top-[3.5rem]"
        />
      )}
    </div>
  );
};

export default SearchLocation;
