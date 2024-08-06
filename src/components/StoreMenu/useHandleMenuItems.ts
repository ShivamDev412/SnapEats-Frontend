import useFormHandler from "@/Hooks/useFormHandler";
import { MenuItemSchema } from "@/Schema/Store.Schema";
import { v4 as uuidv4 } from "uuid";
import {
  MenuDetailType,
  MenuItemType,
  useAddMenuItemMutation,
  useUpdateMenuItemMutation,
} from "@/redux/slice/api/store/menuSlice";
import { DEFAULT_VALUES } from "@/utils/Constants";
import Toast from "@/utils/Toast";
import { useFieldArray, useWatch } from "react-hook-form";
import { useEffect } from "react";
const useMenu = (
  showModal: boolean,
  setShowModal: (showModal: boolean) => void,
  actionType: string,
  setActionType: (actionType: string) => void,
  menuItem?: MenuDetailType
) => {
  const [addMenuItem, { isLoading: isAddMenuItemLoading }] =
    useAddMenuItemMutation();
  const [updateMenuItem, { isLoading: isUpdateMenuItemLoading }] =
    useUpdateMenuItemMutation();
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
  useEffect(() => {
    if (!showModal) {
      setActionType("");
      reset();
    } else {
      if (actionType === "edit" && menuItem) {
        reset();
        setValue("name", menuItem.name);
        setValue("description", menuItem.description);
        setValue("price", menuItem.price);
        setValue("category", menuItem.category.id);
        setValue("isVeg", menuItem.isVeg);
        setValue("prepTime", menuItem.prepTime);
        setValue("image", menuItem.image);
        menuItem?.options?.forEach(async (option, optionIndex) => {
          appendOption({
            optionId: option.optionId,
            isRequired: option.isRequired,
            id: uuidv4(),
            choices: [],
          });
          option?.choices?.forEach((choice) => {
            appendChoice(optionIndex, {
              id: uuidv4(),
              choiceId: choice.predefinedChoiceId || "",
              name: choice.customChoice || "",
              additionalPrice: choice.additionalPrice,
            });
          });
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionType, setShowModal]);
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const isLoading = isAddMenuItemLoading || isUpdateMenuItemLoading;
  const onSubmit = async (data: MenuItemType) => {
    const { image, name, description, category, price, options } = { ...data };
    const optionsToSend = options.map((option) => {
      return {
        optionId: option.optionId,
        isRequired: option.isRequired,
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
    if (actionType === "edit") formData.append("menuId", menuItem?.id || "");
    try {
      const res =
        actionType === "add"
          ? await addMenuItem(formData).unwrap()
          : await updateMenuItem(formData).unwrap();
      if (res.success) {
        Toast(res.message, "success");

        handleCloseModal();
        reset(DEFAULT_VALUES.MENU_ITEM as unknown as MenuItemType);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      Toast(e?.data?.message, "error");
    }
  };

  return {
    showModal,
    handleCloseModal,
    actionType,
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
        isRequired: false,
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
