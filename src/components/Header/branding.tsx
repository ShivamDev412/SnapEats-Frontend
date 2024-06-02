import Logo from "@/assets/logo.svg";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { Link } from "react-router-dom";
const Branding = () => {
  return (
    <div className="w-[1.2in] lg:w-[1.5in] h-auto">
      <Link to={BROWSER_ROUTE.HOME}>
        <img src={Logo} alt="snapeats_logo" className="w-full h-full" />
      </Link>
    </div>
  );
};

export default Branding;
