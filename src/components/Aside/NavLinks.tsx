import { STORE_NAV_LIST } from "@/utils/Constants";
import { IconType } from "react-icons/lib";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

type ListType = {
  Icon: IconType;
  link: string;
  title: string;
  currentPath: string;
};

const LinkItem: React.FC<ListType> = ({ Icon, link, title, currentPath }) => {
  return (
    <Link
      className={`text-zinc-100 flex gap-4 items-center hover:bg-primary transition-all p-2 rounded-lg ${
        currentPath === link ? "bg-primary" : "bg-transparent"
      }`}
      to={link}
    >
      <Icon className="w-6 h-6 2xl:h-7 2xl:w-7" />
      <p className="text-lg 2xl:text-xl font-semibold">{title}</p>
    </Link>
  );
};

const NavLinks = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <section className="flex gap-8 flex-col mt-10">
      {STORE_NAV_LIST.map(({ link, title, Icon, id }) => (
        <LinkItem
          key={id}
          link={link}
          title={title}
          Icon={Icon}
          currentPath={currentPath}
        />
      ))}
    </section>
  );
};

export default NavLinks;
