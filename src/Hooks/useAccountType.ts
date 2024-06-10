import { RootState } from "@/redux/Store";
import { ACCOUNT_TYPE } from "@/utils/Constants";
import { useSelector } from "react-redux";

const useAccountType = () => {
  const { accountType } = useSelector((state: RootState) => state.account);
  return accountType === ACCOUNT_TYPE.USER ? true : false;
};
export default useAccountType;
