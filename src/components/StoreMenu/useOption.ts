import {
  useLazyGetMenuChoicesQuery,
  useMenuOptionsQuery,
} from "@/redux/slice/api/store/menuSlice";
import Toast from "@/utils/Toast";

const useOption = () => {
  const { data: options } = useMenuOptionsQuery("");
  const [getMenuChoices, { data: predefinedChoices }] =
    useLazyGetMenuChoicesQuery();

  const handleOptionChange = async (optionId: string) => {
    try {
      const choices = await getMenuChoices(optionId).unwrap();
      return choices;
    } catch (error: any) {
      Toast(error.message as string, "error");
      return [];
    }
  };

  return { options, handleOptionChange, predefinedChoices };
};

export default useOption;
