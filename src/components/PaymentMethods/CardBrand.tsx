import {
  FaCcDiscover,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcJcb,
  FaCcDinersClub,
  FaCreditCard,
} from "react-icons/fa";
const CardBrand = ({ brand }: { brand: string }) => {
  const renderBrandIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case "visa":
        return <FaCcVisa className="h-7 w-7"/>;
      case "mastercard":
        return <FaCcMastercard className="h-7 w-7"/>;
      case "amex":
        return <FaCcAmex className="h-7 w-7"/>;
      case "discover":
        return <FaCcDiscover className="h-7 w-7"/>;
      case "jcb":
        return <FaCcJcb className="h-7 w-7"/>;
      case "diners":
        return <FaCcDinersClub className="h-7 w-7"/>;
      default:
        return <FaCreditCard className="h-7 w-7"/>;
    }
  };
  return <>{renderBrandIcon(brand)}</>;
};

export default CardBrand;
