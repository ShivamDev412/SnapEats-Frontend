import { FaRegClock } from "react-icons/fa6";
import { MenuType } from "@/redux/slice/api/store/menuSlice";
import useMenuItems from "./useMenuItems";
import LazyLoadedImageComponent from "../LazyLoadedImageComponent";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { Link } from "react-router-dom";
const Item: React.FC<{ item: MenuType }> = ({ item }) => {
  const {
    name,
    description,
    price,
    image,
    category,
    compressedImage,
    prepTime,
    id,
  } = {
    ...item,
  };
  return (
    <Link
      className="bg-zinc-800 rounded-lg w-1/5"
      to={`${BROWSER_ROUTE.STORE_MENU}/${id}`}
    >
      <LazyLoadedImageComponent
        image={image}
        alt={name}
        className="rounded-t-lg"
        compressedImage={compressedImage}
      />
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-xl font-bold line-clamp-2">{name}</h3>
        <p className="text-sm text-zinc-400 line-clamp-2">{description}</p>
        <p className="text-lg font-bold">${price}</p>
        <p className="text-sm text-zinc-100 flex gap-2 items-center">
          <FaRegClock className="h-5 w-5" />
          {prepTime} mins
        </p>
        <p className="bg-primary px-2 py-1 rounded-[25px] w-fit text-sm">
          {category.name}
        </p>
      </div>
    </Link>
  );
};
const MenuItems = () => {
  const { menuItems, isFetching } = useMenuItems();
  const { data } = { ...menuItems };
  if (isFetching) {
    return <div>Loading...</div>;
  }
  return (
    <section className="flex gap-4 flex-wrap">
      {data?.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </section>
  );
};

export default MenuItems;
