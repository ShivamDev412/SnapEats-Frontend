import { OptionType } from "@/redux/slice/api/user/homeSlice";
import { useEffect, useState } from "react";

const useFoodItemDetails = (price: number, options: OptionType[]) => {
  const [selectedChoices, setSelectedChoices] = useState<{
    [key: string]: string;
  }>({});
  const [isRequiredChoiceSelected, setIsRequiredChoiceSelected] =
    useState(true);
  const [totalPrice, setTotalPrice] = useState(price);

  const handleChoiceChange = (
    optionId: string,
    choiceId: string,
    additionalPrice: number
  ) => {
    setSelectedChoices((prevChoices) => ({
      ...prevChoices,
      [optionId]: choiceId,
    }));

    setTotalPrice((prevTotal) => {
      const previousChoiceId = selectedChoices[optionId];
      const previousChoice = options
        .find((option) => option.id === optionId)
        ?.choices.find((choice) => choice.id === previousChoiceId);
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
  const addToCart = () => {

  };
  return {
    selectedChoices,
    isRequiredChoiceSelected,
    totalPrice,
    handleChoiceChange,
    addToCart,
  };
};
export default useFoodItemDetails;
