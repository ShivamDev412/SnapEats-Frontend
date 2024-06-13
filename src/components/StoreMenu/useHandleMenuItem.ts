import { useFieldArray, useWatch } from "react-hook-form";
import { MenuItemType } from "@/redux/slice/api/storeSlice";
import useFormHandler from "@/Hooks/useFormHandler";
import { DEFAULT_VALUES } from "@/utils/Constants";
import { MenuItemSchema } from "@/Schema/Store.Schema";
import { v4 as uuidv4 } from "uuid";
import { useMenuCategoriesQuery } from "@/redux/slice/api/storeSlice";

const useHandleMenuItem = () => {
  const { data: categories, isFetching } = useMenuCategoriesQuery("");
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
    control,
  } = useFormHandler<MenuItemType>(
    DEFAULT_VALUES.MENU_ITEM as unknown as MenuItemType,
    MenuItemSchema
  );

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: "options",
  });

  const watchedOptions = useWatch({ control, name: "options" });

  const appendChoice = (optionIndex: number, choice: any) => {
    const options = getValues("options");
    const updatedChoices = [
      ...(options[optionIndex].choices || []),
      { ...choice, id: uuidv4() },
    ];
    setValue(`options.${optionIndex}.choices`, updatedChoices, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const removeChoice = (optionIndex: number, choiceIndex: number) => {
    const options = getValues("options");
    const updatedChoices = options[optionIndex].choices.filter(
      (_, index) => index !== choiceIndex
    );
    setValue(`options.${optionIndex}.choices`, updatedChoices, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const onSubmit = (data: MenuItemType) => {
    console.log(data);
    reset({
      name: "",
      description: "",
      price: 0,
      image: null,
      options: [],
    });
  };

  return {
    categories,
    isFetching,
    register,
    handleSubmit,
    setValue,
    getValues,
    errors,
    onSubmit,
    optionFields,
    appendOption: () =>
      appendOption({
        id: uuidv4(),
        optionId: "",
        choices: [{ choiceId: "", id: uuidv4(), name: "", additionalPrice: 0 }],
      }),
    removeOption,
    appendChoice,
    removeChoice,
    control,
    watchedOptions,
  };
};

export default useHandleMenuItem;
