import { IoIosLogOut } from "react-icons/io";
import useLogOut from "./useLogOut";
const LogOut = () => {
  const handleLogOut = useLogOut();
  return (
    <button
      className="text-red-600 gap-2 flex items-center"
      onClick={handleLogOut}
    >
      <IoIosLogOut className="text-red-600 h-6 w-6" />
      <p className="font-semibold">Log Out</p>
    </button>
  );
};

export default LogOut;
