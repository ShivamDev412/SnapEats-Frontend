import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, MenuItem } from "@mui/material";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-i18next";
import { FaRegUserCircle } from "react-icons/fa";
import { IoRestaurantSharp, IoSettings } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiFileListFill } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";
import useProfile from "./useProfile";
import AvatarComponent from "../Avatar";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { useUserQuery } from "@/redux/slice/api/user/profileSlice";
import { useLazyGetStoreByUserQuery } from "@/redux/slice/api/store/profileSlice";
import { setStoreStatus } from "@/redux/slice/storeSlice";
import { MdOutlinePayment } from "react-icons/md";

type MenuDataProps = {
  menu: string;
  link: string;
  setShowDropdown: (value: boolean) => void;
  icon?: JSX.Element;
};
const MenuData: FC<MenuDataProps> = ({ menu, link, setShowDropdown, icon }) => {
  return (
    <MenuItem className="px-6 hover:bg-white hover:text-primary flex items-center gap-2">
      <span>{icon}</span>
      <Link to={link} onClick={() => setShowDropdown(false)} className="w-full">
        {menu}
      </Link>
    </MenuItem>
  );
};
const ProfileSection = () => {
  const dispatch = useDispatch();
  const { data: user, isLoading: isUserLoading } = useUserQuery("", {
    // refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [trigger, { data: store }] = useLazyGetStoreByUserQuery();
  const { logoutHandler } = useProfile();
  const [showDropdown, setShowDropdown] = useState(false);
  const { i18n } = useTranslation();
  useEffect(() => {
    if (user?.data.storeId) {
      trigger(user?.data.storeId);
    }
  }, [trigger, user?.data.storeId]);
  useEffect(() => {
    if (user?.data.language) {
      i18n.changeLanguage(user?.data.language);
    }
  }, [i18n, user?.data.language]);
  useEffect(() => {
    if (store?.data?.status === "PENDING") {
      dispatch(setStoreStatus("pending"));
    } else if (store?.data?.status === "APPROVED") {
      dispatch(setStoreStatus("approved"));
    }
  }, [dispatch, store?.data?.status]);
  const { t } = useTranslation();
  return (
    <Dropdown open={showDropdown}>
      <MenuButton>
        {isUserLoading ? (
          <Skeleton circle={true} height={40} width={40} />
        ) : user?.data?.profilePicture ? (
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
          menu={t("profile")}
          link={BROWSER_ROUTE.PROFILE}
          setShowDropdown={setShowDropdown}
          icon={<FaRegUserCircle className="h-5 w-5" />}
        />
        <MenuData
          menu={t("manageAddress")}
          link={BROWSER_ROUTE.MANAGE_ADDRESS}
          setShowDropdown={setShowDropdown}
          icon={<FaMapLocationDot className="h-5 w-5" />}
        />
        <MenuData
          menu={t("payment")}
          link={BROWSER_ROUTE.PAYMENT_METHODS}
          setShowDropdown={setShowDropdown}
          icon={<MdOutlinePayment className="h-5 w-5" />}
        />
        <MenuData
          menu={t("orders")}
          link={BROWSER_ROUTE.ORDERS}
          setShowDropdown={setShowDropdown}
          icon={<RiFileListFill className="h-5 w-5" />}
        />
        {(!user?.data.storeId || store?.data?.status === "PENDING") && (
          <MenuData
            menu={t("registerYourStore")}
            link={BROWSER_ROUTE.STORE_REGISTER}
            setShowDropdown={setShowDropdown}
            icon={<IoRestaurantSharp className="h-5 w-5" />}
          />
        )}

        <MenuData
          menu={t("settings")}
          link={BROWSER_ROUTE.SETTINGS}
          setShowDropdown={setShowDropdown}
          icon={<IoSettings className="h-5 w-5" />}
        />
        <MenuItem
          className="px-6 hover:bg-white hover:text-primary text-gray-600 flex gap-2 items-center"
          onClick={logoutHandler}
        >
          <IoIosLogOut className="h-5 w-5" />
          <p>{t("logout")}</p>
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default ProfileSection;
