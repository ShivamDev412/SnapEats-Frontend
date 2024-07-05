import React from "react";
import {
  MenuCategory,
  MenuDetailType,
  MenuItemType,
} from "@/redux/slice/api/store/menuSlice";
import { IoFastFoodOutline } from "react-icons/io5";
import FileUpload from "../UploadFile";
import { SelectField, TextInput, TextareaField } from "../InputComponent";
import Button from "../Button";
import Option from "./Option";
import ToggleInput from "../InputComponent/ToggleInput";
import {
  FieldErrors,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
type MenuItemFormProps = {
  actionType: string;
  handleCloseModal: () => void;
  categories: MenuCategory[];
  menuItem?: MenuDetailType;
  handleSubmit: UseFormHandleSubmit<MenuItemType, undefined>;
  onSubmit: (data: MenuItemType) => void;
  register: UseFormRegister<MenuItemType>;
  errors: FieldErrors<MenuItemType>;
  setValue: UseFormSetValue<MenuItemType>;
  optionFields: {
    id: string;
    optionId: string;
    choices: {
      choiceId: string;
      id: string;
      name: string;
      additionalPrice: number;
    }[];
  }[];
  removeOption: UseFieldArrayRemove;
  appendOption: () => void;
  appendChoice: (optionIndex: number, choice: any) => void;
  removeChoice: (optionIndex: number, choiceIndex: number) => void;
  control: any;
  watchedOptions: MenuItemType["options"];
  isLoading: boolean;
  getValues?: UseFormGetValues<MenuItemType>;
};
const MenuItemForm: React.FC<MenuItemFormProps> = ({
  actionType,
  categories,
  handleSubmit,
  onSubmit,
  register,
  errors,
  setValue,
  optionFields,
  removeOption,
  appendChoice,
  removeChoice,
  control,
  watchedOptions,
  appendOption,
  isLoading,
  getValues,
}) => {
  const handleChoiceChange = (
    optionIndex: number,
    choiceIndex: number,
    field: keyof MenuItemType["options"][number]["choices"][number],
    value: any
  ) => {
    setValue(`options.${optionIndex}.choices.${choiceIndex}.${field}`, value);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full gap-4 flex flex-col max-h-[80vh] overflow-auto"
      >
        <h3 className="text-2xl font-semibold text-center flex gap-1 items-center mx-auto">
          <IoFastFoodOutline className="h-7 w-7" />
          {actionType === "add" ? "Add New Dish" : "Edit Dish"}
        </h3>
        <FileUpload
          id={"image"}
          control={control}
          register={register}
          errors={errors}
          className="rounded-lg object-cover"
          title={"Upload Dish Image"}
        />
        <TextInput
          id="name"
          type="text"
          register={register}
          errors={errors}
          placeholder="Dish Name"
        />
        <TextareaField
          id="description"
          register={register}
          errors={errors}
          placeholder="Dish Description"
        />
        <TextInput
          id="price"
          type="number"
          register={register}
          errors={errors}
          placeholder="Base Price $0.00"
        />
        <ToggleInput
          id="isVeg"
          control={control}
          register={register}
          errors={errors}
          label="Is Vegetarian"
        />
        <TextInput
          id="prepTime"
          type="number"
          register={register}
          errors={errors}
          placeholder="Preparation Time in minutes"
        />
        <SelectField
          id="category"
          register={register}
          placeholder="Menu Category"
          errors={errors}
          data={categories ?? []}
        />
        <div>
          {optionFields.map((option, optionIndex) => (
            <Option
              key={option.id}
              option={option}
              optionIndex={optionIndex}
              register={register}
              errors={errors}
              removeOption={removeOption}
              appendChoice={appendChoice}
              handleChoiceChange={handleChoiceChange}
              removeChoice={removeChoice}
              watchedChoices={watchedOptions?.[optionIndex]?.choices ?? []}
              setValue={setValue}
              control={control}
              getValues={getValues}
            />
          ))}
          <Button
            onClick={() => appendOption()}
            className="bg-green-700 text-white rounded px-4 py-2"
          >
            Add Option
          </Button>
        </div>

        <Button type="submit" isLoading={isLoading}>
          {actionType === "add" ? "Add Dish" : "Update Dish"}
        </Button>
      </form>
    </>
  );
};

export default MenuItemForm;
