import LazyLoadedImageComponent from "@/components/LazyLoadedImageComponent";
import useMenuDetails from "./useMenuDetails";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { HandleMenuItem, PrimaryDetail } from "@/components/StoreMenu";
import Button from "@/components/Button";
import useMenu from "./useMenu";

const MenuDetails = () => {
  const {
    menuItem,
    isFetching: isMenuFetching,
    handleDelete,
  } = useMenuDetails();
  const { categories, showModal, setShowModal, actionType, setActionType } =
    useMenu();
  const { data } = { ...menuItem };
  const {
    name,
    description,
    image,
    compressedImage,
    price,
    prepTime,
    isVeg,
    category,
    options,
  } = { ...data };
  if (isMenuFetching) return <div>Loading...</div>;
  return (
    <section className="flex flex-col w-11/12 2xl:w-10/12 mt-10 gap-4">
      <Link to={BROWSER_ROUTE.STORE_MENU}>
        {" "}
        <IoArrowBack className="fill-zinc-100 h-10 w-10" />
      </Link>
      <section className="flex gap-4">
        <LazyLoadedImageComponent
          image={image || ""}
          compressedImage={compressedImage || ""}
          alt={`${name} image`}
          className="w-5/12 h-full rounded-lg"
        />
        <section className="flex flex-col gap-4">
          <PrimaryDetail
            name={name || ""}
            description={description || ""}
            price={price || 0}
            categoryName={category?.name || ""}
            isVeg={isVeg || false}
            prepTime={prepTime || 0}
          />
          <section className="flex gap-2">
            <Button
              className="bg-green-800"
              onClick={() => {
                setActionType("edit");
                setShowModal(true);
              }}
            >
              Edit
            </Button>
            <Button className="bg-red-800" onClick={handleDelete}>
              Delete
            </Button>
          </section>
          <section>
            <h4 className="text-xl font-bold">Options</h4>
            <ul className="flex flex-col gap-2 mt-2">
              {options?.map((option) => (
                <li key={option.id} className="text-lg ml-2 font-semibold">
                  {option.option.name}
                  <ul className="flex gap-2 ml-2 flex-wrap">
                    {option.choices.map((choice, index) => (
                      <li
                        key={choice.id}
                        className="text-zinc-400 font-medium flex gap-2"
                      >
                        {choice.predefinedChoice?.name || choice.customChoice} -
                        ${choice.additionalPrice}
                        {option.choices.length > 1 &&
                          index !== option.choices.length - 1 && <span>|</span>}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </section>
      <HandleMenuItem
        categories={categories?.data ?? []}
        showModal={showModal}
        setShowModal={setShowModal}
        actionType={actionType}
        setActionType={setActionType}
        menuItem={menuItem?.data}
      />
    </section>
  );
};

export default MenuDetails;
