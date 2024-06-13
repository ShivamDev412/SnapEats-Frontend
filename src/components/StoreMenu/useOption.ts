import {
  useLazyGetMenuChoicesQuery,
  useMenuOptionsQuery,
} from "@/redux/slice/api/storeSlice";
import Toast from "@/utils/Toast";


const useOption = () => {
  const { data: options } = useMenuOptionsQuery("");
  const [getMenuChoices, { data: predefinedChoices }] =
    useLazyGetMenuChoicesQuery();
  const handleOptionChange = async (optionId: string) => {
    try {
      await getMenuChoices(optionId).unwrap();
    } catch (error: any) {
      Toast(error.message as string, "error");
    }
  };
  return { options, handleOptionChange, predefinedChoices };
};
export default useOption;
