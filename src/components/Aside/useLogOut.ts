import { useLogOutMutation } from "@/redux/slice/api/user/profileSlice";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/slice/authSlice";
import Toast from "@/utils/Toast";

const useLogOut = () => {
  const dispatch = useDispatch();
  const [logOutAdmin] = useLogOutMutation();
  const handleLogOut = async () => {
    try {
      const res = await logOutAdmin().unwrap();
      if (res.success) {
        Toast(res.message, "success");
        dispatch(logOut());
      }
    } catch (error: any) {
      Toast(error.data.message, "error");
    }
  };
  return handleLogOut;
};
export default useLogOut;
