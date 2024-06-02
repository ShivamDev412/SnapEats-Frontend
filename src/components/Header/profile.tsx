import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, MenuItem } from "@mui/material";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { useUserQuery } from "@/redux/slice/api/userSlice";
import useProfile from "./useProfile";
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
  const { data: user } = useUserQuery("");
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
          <Avatar
            className="bg-primary h-[3rem] w-[3rem]"
            onClick={() => setShowDropdown(!showDropdown)}
          >{`${user?.data?.name?.split(" ")[0]?.split("")[0]}${
            user?.data?.name?.split(" ")[1]?.split("")[0]
          }`}</Avatar>
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
