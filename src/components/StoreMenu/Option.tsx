import React from "react";
import {
  UseFormRegister,
  FieldErrors,
  FieldArrayWithId,
} from "react-hook-form";
import { FiMinus } from "react-icons/fi";
import { SelectField } from "../InputComponent";
import Button from "../Button";
import { MenuItemType } from "@/redux/slice/api/storeSlice";
import useOption from "./useOption";
import Choice from "./Choice";

type OptionProps = {
  option: FieldArrayWithId<MenuItemType, "options", "id">;
  optionIndex: number;
  register: UseFormRegister<MenuItemType>;
  errors: FieldErrors<MenuItemType>;
  removeOption: (index: number) => void;
  appendChoice: (optionIndex: number, choice: any) => void;
  handleChoiceChange: (
    optionIndex: number,
    choiceIndex: number,
    field: keyof MenuItemType["options"][number]["choices"][number],
    value: any
  ) => void;
  removeChoice: (optionIndex: number, choiceIndex: number) => void;
  watchedChoices: MenuItemType["options"][number]["choices"];
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
}) => {
  const { options, handleOptionChange, predefinedChoices } = useOption();
  return (
    <div
      key={option.id}
      className="border-zinc-300 border-[0.5px] mb-2 p-2 rounded-sm"
    >
      <div className="flex gap-2 items-end ">
        <SelectField
          id={`options.${optionIndex}.optionId`}
          register={register}
          placeholder="Select Option"
          errors={errors}
          onChange={(e) => handleOptionChange(e.target.value)}
          data={options?.data || []}
        />
        <Button
          onClick={() => removeOption(optionIndex)}
          className="bg-red-700 p-0 mb-4"
        >
          <FiMinus className="h-7 w-7" />
        </Button>
      </div>

      {predefinedChoices?.data &&
        predefinedChoices?.data?.length > 0 &&
        watchedChoices?.map((choice, choiceIndex) => (
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
          />
        ))}
    </div>
  );
};

export default Option;
