import MobileHeader from "./MobileHeader";
import WebHeader from "./WebHeader";

const Header = () => {
  return (
    <header className="border-b-[0.5px] border-zinc-800 p-4">
      <WebHeader />
      <MobileHeader />
    </header>
  );
};

export default Header;
