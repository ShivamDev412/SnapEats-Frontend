import Address from "./address";
import Branding from "./branding";
import Profile from "./profile";
import Search from "./search";
const WebHeader = () => {
  return (
    <div className="md:flex items-center w-11/12 mx-auto justify-between hidden">
      <Branding />
      <Address />
      <Search />
      <Profile />
    </div>
  );
};

export default WebHeader;
