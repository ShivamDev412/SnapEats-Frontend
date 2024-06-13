import { useFieldArray, useWatch } from "react-hook-form";
import {
  MenuItemType,
  useAddMenuItemMutation,
} from "@/redux/slice/api/storeSlice";
import useFormHandler from "@/Hooks/useFormHandler";
import { DEFAULT_VALUES } from "@/utils/Constants";
import { MenuItemSchema } from "@/Schema/Store.Schema";
import { v4 as uuidv4 } from "uuid";
import { useMenuCategoriesQuery } from "@/redux/slice/api/storeSlice";
import Toast from "@/utils/Toast";

const useHandleMenuItem = (handleCloseModal: () => void) => {
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
  const [addMenuItem, { isLoading }] = useAddMenuItemMutation();
  const onSubmit = async (data: MenuItemType) => {
    const { image, name, description, category, price, options } = { ...data };
    const optionsToSend = options.map((option) => {
      return {
        optionId: option.optionId,
        choice: option.choices.map((choice) => ({
          choiceId: choice.choiceId,
          name: choice.name,
          additionalPrice: choice.additionalPrice,
        })),
      };
    });
    const formData = new FormData();
    formData.append("image", typeof image[0] === "object" ? image[0] : image);

    formData.append("name", name);
    formData.append("description", description);
    formData.append("basePrice", price.toString());
    formData.append("category", category);
    formData.append("options", JSON.stringify(optionsToSend));
    try {
      const res = await addMenuItem(formData).unwrap();
      if (res.success) {
        Toast(res.message, "success");
        handleCloseModal();
        reset({
          name: "",
          description: "",
          price: 0,
          image: null,
          options: [],
        });
      }
    } catch (e: any) {
      Toast(e?.data?.message, "error");
    }
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
    isLoading,
  };
};

export default useHandleMenuItem;
