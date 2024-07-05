import { useAddToCartMutation } from "@/redux/slice/api/user/cartSlice";
import { OptionType } from "@/redux/slice/api/user/homeSlice";
import Toast from "@/utils/Toast";
import { useEffect, useState } from "react";

const useFoodItemDetails = (
  price: number,
  options: OptionType[],
  handleCloseModal: () => void
) => {
  const [selectedChoices, setSelectedChoices] = useState<{
    [key: string]: {
      choiceId?: string;
      choiceName: string;
      additionalPrice: number;
    };
  }>({});
  const [isRequiredChoiceSelected, setIsRequiredChoiceSelected] =
    useState(true);
  const [totalPrice, setTotalPrice] = useState(price);

  const handleChoiceChange = (
    optionId: string,
    choiceId: string | undefined,
    choiceName: string,
    additionalPrice: number
  ) => {
    setSelectedChoices((prevChoices) => ({
      ...prevChoices,
      [optionId]: { choiceId, choiceName, additionalPrice },
    }));

    setTotalPrice((prevTotal) => {
      const previousChoice = selectedChoices[optionId];
      const previousAdditionalPrice = previousChoice?.additionalPrice || 0;

      return prevTotal - previousAdditionalPrice + additionalPrice;
    });
  };

  useEffect(() => {
    const requiredOptions = options.filter((option) => option.isRequired);
    const allRequiredSelected = requiredOptions.every(
      (option) => selectedChoices[option.id]
    );
    setIsRequiredChoiceSelected(allRequiredSelected);
  }, [selectedChoices, options]);
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const handleAddToCart = async (
    menuItemId: string,
    menuItemName: string,
    menuItemPrice: number,
    note: string
  ) => {
    const optionsArray = Object.keys(selectedChoices).map((optionId) => {
      const { choiceId, choiceName, additionalPrice } =
        selectedChoices[optionId];
      const option = options.find((opt) => opt.id === optionId);
      return {
        optionId,
        optionName: option?.option.name || "",
        choiceId,
        choiceName,
        additionalPrice,
      };
    });
    const dataToSend = {
      menuItemId,
      menuItemName,
      menuItemPrice,
      note,
      options: optionsArray,
    };
    try {
      const res = await addToCart(dataToSend).unwrap();
      if (res.success) {
        handleCloseModal();
        Toast(res.message, "success");
      }
    } catch (err: any) {
      Toast(err.message, "error");
    }
  };

  return {
    selectedChoices,
    isRequiredChoiceSelected,
    totalPrice,
    handleChoiceChange,
    handleAddToCart,
    isLoading,
  };
};

export default useFoodItemDetails;
