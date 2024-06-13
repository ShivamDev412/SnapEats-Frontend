import React from "react";
import { MenuItemType } from "@/redux/slice/api/storeSlice";
import FileUpload from "../UploadFile";
import { SelectField, TextInput, TextareaField } from "../InputComponent";
import Button from "../Button";
import Option from "./Option";
import useHandleMenuItem from "./useHandleMenuItem";

type HandleMenuItemProps = {
  actionType: string;
};
const HandleMenuItem: React.FC<HandleMenuItemProps> = ({ actionType }) => {
  const {
    categories,
    isFetching,
    handleSubmit,
    onSubmit,
    register,
    errors,
    setValue,
    optionFields,
    appendOption,
    removeOption,
    appendChoice,
    removeChoice,
    watchedOptions,
    control
  } = useHandleMenuItem();
  const handleChoiceChange = (
    optionIndex: number,
    choiceIndex: number,
    field: keyof MenuItemType["options"][number]["choices"][number],
    value: any
  ) => {
    setValue(`options.${optionIndex}.choices.${choiceIndex}.${field}`, value);
  };
  if (isFetching) return <div>Loading...</div>;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full gap-4 flex flex-col max-h-[80vh] overflow-auto"
    >
      <h3 className="text-2xl font-semibold text-center">
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
      <SelectField
        id="category"
        register={register}
        placeholder="Menu Category"
        errors={errors}
        data={categories?.data ?? []}
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
          />
        ))}
        <Button
          onClick={() => appendOption()}
          className="bg-green-700 text-white rounded px-4 py-2"
        >
          Add Option
        </Button>
      </div>

      <Button type="submit">Add Dish</Button>
    </form>
  );
};

export default HandleMenuItem;
