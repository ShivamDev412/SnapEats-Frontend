import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, MenuItem } from "@mui/material";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { useUserQuery } from "@/redux/slice/api/userSlice";
import useProfile from "./useProfile";
import AvatarComponent from "../Avatar";
type MenuDataProps = {
  menu: string;
  link: string;
  setShowDropdown: (value: boolean) => void;
};
const MenuData: FC<MenuDataProps> = ({ menu, link, setShowDropdown }) => {
  return (
    <MenuItem className="px-6 hover:bg-white hover:text-primary">
      <Link to={link} onClick={() => setShowDropdown(false)} className="w-full">
        {menu}
      </Link>
    </MenuItem>
  );
};
const ProfileSection = () => {
  const { data: user } = useUserQuery("", {
    // refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const { logoutHandler } = useProfile();
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <Dropdown open={showDropdown}>
      <MenuButton>
        {user?.data?.profilePicture ? (
          <Avatar
            alt={`${user?.data?.name}_profile_picture`}
            src={user?.data?.profilePicture}
            onClick={() => setShowDropdown(!showDropdown)}
            className="h-[3rem] w-[3rem]"
          />
        ) : (
          <AvatarComponent
            className="h-[2.5rem] w-[2.5rem] text-xl sm:w-[3rem] sm:h-[3rem] sm:text-2xl"
            name={user?.data?.name as string}
            onClick={() => setShowDropdown(!showDropdown)}
          />
        )}
      </MenuButton>
      <Menu className="bg-zinc-900 text-zinc-100 rounded-lg border border-zinc-700 w-[2in] py-3 z-10">
        <MenuData
          menu="Profile"
          link={BROWSER_ROUTE.PROFILE}
          setShowDropdown={setShowDropdown}
        />
        <MenuData
          menu="Manage Address"
          link={BROWSER_ROUTE.MANAGE_ADDRESS}
          setShowDropdown={setShowDropdown}
        />
        <MenuData
          menu="Orders"
          link={BROWSER_ROUTE.ORDERS}
          setShowDropdown={setShowDropdown}
        />
        <MenuData
          menu="Register Your Store"
          link={BROWSER_ROUTE.STORE_REGISTER}
          setShowDropdown={setShowDropdown}
        />
        <MenuData
          menu="Settings"
          link={BROWSER_ROUTE.EDIT_PROFILE}
          setShowDropdown={setShowDropdown}
        />
        <MenuItem
          className="px-6 hover:bg-white hover:text-primary text-gray-600"
          onClick={logoutHandler}
        >
          <p>Logout</p>
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default ProfileSection;
