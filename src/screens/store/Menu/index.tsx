import {
  SearchAndAdd,
  HandleMenuItem,
  MenuCategories,
  MenuItems,
} from "@/components/StoreMenu";
import useMenu from "./useMenu";

const Menu = () => {
  const {
    categories,
    isFetching,
    showModal,
    setShowModal,
    actionType,
    setActionType,
  } = useMenu();
  if (isFetching) {
    return <div>Loading...</div>;
  }
  return (
    <section className="w-11/12 2xl:w-10/12">
      <h2 className="text-3xl font-semibold mb-10">Your Menu</h2>
      <SearchAndAdd setShowModal={setShowModal} setActionType={setActionType} />
      <MenuCategories categories={categories?.data ?? []} />
      <MenuItems />
      <HandleMenuItem
        categories={categories?.data ?? []}
        showModal={showModal}
        setShowModal={setShowModal}
        actionType={actionType}
        setActionType={setActionType}
      />
    </section>
  );
};

export default Menu;
