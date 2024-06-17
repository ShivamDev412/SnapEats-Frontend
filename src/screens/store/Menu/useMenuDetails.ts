import {
  useDeleteMenuItemMutation,
  useMenuItemDetailsQuery,
} from "@/redux/slice/api/store/menuSlice";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import Toast from "@/utils/Toast";
import { useLocation, useNavigate } from "react-router-dom";
const useMenuDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuId = location.pathname.split("/")[3];
  const { data: menuItem, isFetching } = useMenuItemDetailsQuery(menuId);
  const [deleteMenuItem, { isLoading }] = useDeleteMenuItemMutation();
  const handleDelete = async () => {
    try {
      const result = await deleteMenuItem(menuId).unwrap();
      if (result.success) {
        navigate(BROWSER_ROUTE.STORE_MENU);
        Toast(result.message, "success");
      }
    } catch (error: any) {
      Toast(error.data.message, "error");
    }
  };
  return {
    menuItem,
    isFetching,
    handleDelete,
    isLoading,
  };
};
export default useMenuDetails;
