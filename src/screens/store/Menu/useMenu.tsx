import useFormHandler from "@/Hooks/useFormHandler";
import { MenuItemSchema } from "@/Schema/Store.Schema";
import { v4 as uuidv4 } from "uuid";
import {
  MenuDetailType,
  MenuItemType,
  useAddMenuItemMutation,
  useMenuCategoriesQuery,
} from "@/redux/slice/api/store/menuSlice";
import { DEFAULT_VALUES } from "@/utils/Constants";
import Toast from "@/utils/Toast";
import { useFieldArray, useWatch } from "react-hook-form";
import { useState } from "react";
const useMenu = (menuItem?: MenuDetailType) => {
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState("add");

  const [addMenuItem, { isLoading }] = useAddMenuItemMutation();
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
  const { data: categories, isFetching } = useMenuCategoriesQuery("");
  const handleMenuItem = (type: "add" | "edit") => {
    setActionType(type);
    setShowModal(true);
    if (type === "edit" && menuItem) {
      reset();
      setValue("name", menuItem.name);
      setValue("description", menuItem.description);
      setValue("price", menuItem.price);
      setValue("category", menuItem.category.id);
      setValue("isVeg", menuItem.isVeg);
      setValue("prepTime", menuItem.prepTime);
      setValue("image", menuItem.image);

      menuItem.options.forEach(async (option, optionIndex) => {
        appendOption({
          optionId: option.optionId,
          id: uuidv4(),
          choices: [],
        });
        option.choices.forEach((choice) => {
          appendChoice(optionIndex, {
            id: uuidv4(),
            choiceId: choice.predefinedChoiceId || "",
            name: choice.customChoice || "",
            additionalPrice: choice.additionalPrice,
          });
        });
      });
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

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
    formData.append("isVeg", data.isVeg ? "true" : "false");
    formData.append("prepTime", data.prepTime.toString());
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
    handleMenuItem,
    showModal,
    handleCloseModal,
    actionType,
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

export default useMenu;
