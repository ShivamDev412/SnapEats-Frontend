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
      await getMenuChoices(optionId).unwrap();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Toast(error.message as string, "error");
      return [];
    }
  };

  return { options, handleOptionChange, predefinedChoices };
};

export default useOption;
