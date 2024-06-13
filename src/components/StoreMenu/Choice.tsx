import React from "react";
import { v4 as uuidv4 } from "uuid";
import { SelectField, TextInput } from "../InputComponent";
import Button from "../Button";
import { FiMinus } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { BiDollar } from "react-icons/bi";

import { FieldErrors, UseFormRegister } from "react-hook-form";
import { MenuItemType } from "@/redux/slice/api/storeSlice";

type ChoiceProps = {
  optionIndex: number;
  choiceIndex: number;
  register: UseFormRegister<MenuItemType>;
  errors: FieldErrors<MenuItemType>;
  handleChoiceChange: (
    optionIndex: number,
    choiceIndex: number,
    field: keyof MenuItemType["options"][number]["choices"][number],
    value: any
  ) => void;
  removeChoice: (optionIndex: number, choiceIndex: number) => void;
  watchedChoices: MenuItemType["options"][number]["choices"];
  appendChoice: (optionIndex: number, choice: any) => void;
  predefinedChoices: {
    value: string;
    label: string;
  }[];
};
const Choice: React.FC<ChoiceProps> = ({
  optionIndex,
  choiceIndex,
  register,
  errors,
  handleChoiceChange,
  predefinedChoices,
  watchedChoices,
  removeChoice,
  appendChoice,
}) => {
  return (
    <>
      <div className="flex gap-2">
        <SelectField
          id={`options.${optionIndex}.choices.${choiceIndex}.choiceId`}
          register={register}
          placeholder="Choice"
          errors={errors}
          data={predefinedChoices || []}
        />
        <TextInput
          id={`options.${optionIndex}.choices.${choiceIndex}.name`}
          type="text"
          register={register}
          errors={errors}
          placeholder="Custom Choice"
          onChange={(e) =>
            handleChoiceChange(optionIndex, choiceIndex, "name", e.target.value)
          }
        />
        <div className="flex flex-col mb-4 gap-1">
          {watchedChoices.length > 1 && (
            <Button
              type="button"
              onClick={() => removeChoice(optionIndex, choiceIndex)}
              className="bg-red-700 p-0"
            >
              <FiMinus className="h-6 w-6" />
            </Button>
          )}
          <Button
            className="p-0 bg-green-700"
            onClick={() =>
              appendChoice(optionIndex, {
                choiceId: "",
                id: uuidv4(),
                name: "",
                additionalPrice: 0,
              })
            }
          >
            <IoIosAdd className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <div className="w-1/2 flex gap-1 items-center">
        <BiDollar className="h-7 w-7" />
        <TextInput
          id={`options.${optionIndex}.choices.${choiceIndex}.additionalPrice`}
          type="number"
          register={register}
          errors={errors}
          placeholder="Additional Price"
          onChange={(e) =>
            handleChoiceChange(
              optionIndex,
              choiceIndex,
              "additionalPrice",
              parseFloat(e.target.value)
            )
          }
        />
      </div>
    </>
  );
};

export default Choice;
