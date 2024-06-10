import Address from "./address";
import Branding from "./branding";
import Profile from "./profile";
import Search from "./search";

const MobileHeader = () => {
  return (
    <div className="flex flex-col md:hidden">
      <div className="flex  justify-between">
        <Branding type="USER" />
        <Address />
        <Profile />
      </div>
      <Search />
    </div>
  );
};

export default MobileHeader;
