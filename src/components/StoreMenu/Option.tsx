/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import { FiMinus } from "react-icons/fi";
import { SelectField } from "../InputComponent";
import Button from "../Button";
import { MenuItemType } from "@/redux/slice/api/store/menuSlice";
import useOption from "./useOption";
import Choice from "./Choice";
import ToggleInput from "../InputComponent/ToggleInput";

type OptionProps = {
  option: any;
  optionIndex: number;
  register: UseFormRegister<MenuItemType>;
  errors: FieldErrors<MenuItemType>;
  removeOption: (index: number) => void;
  control: any;
  appendChoice: (optionIndex: number, choice: any) => void;
  handleChoiceChange: (
    optionIndex: number,
    choiceIndex: number,
    field: keyof MenuItemType["options"][number]["choices"][number],
    value: any
  ) => void;
  removeChoice: (optionIndex: number, choiceIndex: number) => void;
  watchedChoices: MenuItemType["options"][number]["choices"];
  setValue: UseFormSetValue<MenuItemType>;
  getValues?: UseFormGetValues<MenuItemType>;
};

const Option: React.FC<OptionProps> = ({
  option,
  optionIndex,
  register,
  errors,
  removeOption,
  appendChoice,
  handleChoiceChange,
  removeChoice,
  watchedChoices,
  getValues,
  control,
}) => {
  const { options, handleOptionChange, predefinedChoices } = useOption();

  useEffect(() => {
    const fetchChoices = async () => {
      option.optionId && (await handleOptionChange(option.optionId));
    };

    fetchChoices();
  }, [handleOptionChange, option.optionId]);
  return (
    <div
      key={option.id}
      className="border-zinc-300 border-[0.5px] mb-2 p-2 rounded-sm gap-4 flex flex-col"
    >
      <div className="flex gap-2 items-end ">
        <SelectField
          id={`options.${optionIndex}.optionId`}
          register={register}
          placeholder="Select Option"
          errors={errors}
          getValues={getValues}
          onChange={(e) => handleOptionChange(e.target.value)}
          data={options?.data || []}
        />
        <Button
          onClick={() => removeOption(optionIndex)}
          className="bg-red-700 p-0"
        >
          <FiMinus className="h-7 w-7" />
        </Button>
      </div>
      <ToggleInput
        id={`options.${optionIndex}.isRequired`}
        control={control}
        register={register}
        errors={errors}
        label="Is Required"
      />
      {watchedChoices?.map((choice, choiceIndex) => (
        <Choice
          key={choice.id}
          register={register}
          choiceIndex={choiceIndex}
          optionIndex={optionIndex}
          errors={errors}
          handleChoiceChange={handleChoiceChange}
          predefinedChoices={predefinedChoices?.data || []}
          removeChoice={removeChoice}
          watchedChoices={watchedChoices}
          appendChoice={appendChoice}
          getValues={getValues}
        />
      ))}
    </div>
  );
};

export default Option;
