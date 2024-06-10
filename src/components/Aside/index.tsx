import Branding from "../Header/branding";
import LogOut from "./LogOut";
import NavLinks from "./NavLinks";

const Aside = () => {
  return (
    <aside className="w-2/12 bg-zinc-950 p-6 flex flex-col justify-between">
      <div>
        <Branding />
        <NavLinks />
      </div>
      <LogOut />
    </aside>
  );
};

export default Aside;
