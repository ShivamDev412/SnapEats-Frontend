import Cart from "../Cart";
import Address from "./address";
import Branding from "./branding";
import Profile from "./profile";
import Search from "./search";

const MobileHeader = () => {
  return (
    <div className="flex flex-col md:hidden gap-2">
      <div className="flex justify-between">
        <Branding />
        <Address />

        <Profile />
      </div>
      <div className="flex items-center gap-2">
        <Search />
        <Cart />
      </div>
    </div>
  );
};

export default MobileHeader;
