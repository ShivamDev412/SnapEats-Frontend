import { SearchAndAdd, HandleMenuItem } from "@/components/StoreMenu";
import useMenu from "./useMenu";
import ModalComponent from "@/components/Modal";

const Menu = () => {
  const { handleMenuItem, openModal, handleCloseModal, actionType } = useMenu();

  return (
    <section className="w-10/12">
      <h2 className="text-3xl font-semibold mb-10">Your Menu</h2>
      <SearchAndAdd handleMenuItem={handleMenuItem} />
      <ModalComponent
        open={openModal}
        handleClose={handleCloseModal}
        modalTitle={"handle menu item"}
      >
        <HandleMenuItem actionType={actionType} />
      </ModalComponent>
    </section>
  );
};

export default Menu;
