import useAccountType from "@/Hooks/useAccountType";
import Logo from "@/assets/logo.svg";
import StoreLogo from "@/assets/store_logo.svg";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { Link } from "react-router-dom";

const Branding = () => {
  const isUser = useAccountType()
  return (
    <div className={`${isUser ? "w-[1.2in] lg:w-[1.5in]" : "w-[2in]"} h-auto`}>
      <Link to={BROWSER_ROUTE.HOME}>
        <img
          src={isUser ? Logo : StoreLogo}
          alt="SnapEats_logo"
          className="w-full h-full"
        />
      </Link>
    </div>
  );
};

export default Branding;
