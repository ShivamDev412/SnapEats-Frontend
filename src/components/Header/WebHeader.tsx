import Cart from "@/components/Cart";
import Address from "./address";
import Branding from "./branding";
import Profile from "./profile";
import Search from "./search";
import useAccountType from "@/Hooks/useAccountType";
const WebHeader = () => {
  const isUser = useAccountType();
  return (
    <div className="md:flex items-center w-11/12 mx-auto justify-between hidden">
      <Branding />
      {isUser && (
        <>
          {" "}
          <Address />
          <Search />
          <div className="flex items-center gap-2 xl:gap-4">
            <Cart />
            <Profile />
          </div>
        </>
      )}
    </div>
  );
};

export default WebHeader;
