import Address from "./address";
import Branding from "./branding";
import Profile from "./profile";
import Search from "./search";

const Header = () => {
  return (
    <header className="border-b-[0.5px] border-zinc-800 p-4">
      <div className="flex items-center w-11/12 mx-auto justify-between">
        <Branding />
        <Address />
        <Search />
        <Profile />
      </div>
    </header>
  );
};

export default Header;
