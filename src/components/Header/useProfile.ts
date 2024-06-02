import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "@/redux/slice/authSlice";
import Toast from "@/utils/Toast";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { useLogOutMutation } from "@/redux/slice/api/userSlice";

const useProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogOutMutation();
  const logoutHandler = async () => {
    const response = await logout().unwrap();
    try {
      if (response.success) {
        navigate(BROWSER_ROUTE.LOGIN);
        Toast(response.message, "success");
        dispatch(logOut());
      }
    } catch (error) {
      Toast("Something went wrong", "error");
    }
  };
  return { logoutHandler };
};
export default useProfile;
