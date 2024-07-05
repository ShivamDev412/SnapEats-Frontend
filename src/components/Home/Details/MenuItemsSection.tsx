import LazyLoadedImageComponent from "@/components/LazyLoadedImageComponent";
import { MenuItemsType } from "@/redux/slice/api/user/homeSlice";
import { FC } from "react";
import { FaRegClock } from "react-icons/fa";
import { BiFoodTag } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import ModalComponent from "@/components/Modal";
import useMenuSection from "./useMenuSection";
import FoodItemDetails from "./FoodItemDetails";
import { MdDelete } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";

const MenuItemsSection: FC<{ menuItems: MenuItemsType[] }> = ({
  menuItems,
}) => {
  const {
    openModal,
    handleCloseModal,
    handleOpenModal,
    handleAddToCart,
    modelItem,
  } = useMenuSection();

  const groupMenuItemsByCategory = (
    menuItems: MenuItemsType[]
  ): { category: string; items: MenuItemsType[] }[] => {
    const groupedItems = menuItems.reduce((acc, item) => {
      const categoryId = item.category.id;
      if (!acc[categoryId]) {
        acc[categoryId] = {
          category: item.category.name,
          items: [],
        };
      }
      acc[categoryId].items.push(item);
      return acc;
    }, {} as Record<string, { category: string; items: MenuItemsType[] }>);
    return Object.values(groupedItems);
  };

  const groupedMenuItems = groupMenuItemsByCategory(menuItems);

  return (
    <section>
      {groupedMenuItems.map((group) => (
        <section key={group.category} className="my-8">
          <h3 className="text-2xl font-semibold">{group.category}</h3>
          <div className="flex flex-wrap gap-2 mt-5">
            {group.items.map((item) => (
              <div
                onClick={() => handleOpenModal(item)}
                key={item.id}
                className="flex w-full sm:w-[49%] lg:w-1/3 my-1 xl:my-0 xl:w-1/3 gap-2 bg-zinc-800 p-2 rounded-lg hover:cursor-pointer"
              >
                <LazyLoadedImageComponent
                  image={item.image || ""}
                  compressedImage={item.compressedImage || ""}
                  alt={item.name}
                  className="w-[1in] h-[1in] xl:w-[1.4in] xl:h-[1.4in] rounded-lg"
                />
                <div className="flex flex-col gap-2 items-start">
                  <h4 className="text-center text-xl font-semibold">
                    {item.name}
                  </h4>
                  <p className="text-sm text-zinc-400 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex gap-2 items-center ">
                    <p className="text-sm xl:text-[1rem] font-bold text-green-700">
                      ${item.price.toFixed(2)}
                    </p>
                    <span className="bg-white h-1 w-1 rounded-full"></span>
                    <BiFoodTag
                      className={`${
                        item.isVeg ? "fill-green-700" : "fill-red-700"
                      } h-5 w-5`}
                    />{" "}
                    <span className="bg-white h-1 w-1 rounded-full"></span>
                    <p className="flex gap-1 items-center text-sm xl:text-[1rem]">
                      <FaRegClock className="h-4 w-4" />{" "}
                      {item.prepTime.toFixed(2)} min
                    </p>
                  </div>
                  <div>
                    {item.quantity === 0 ? (
                      <button
                        type="button"
                        aria-label="Add to cart"
                        className="border rounded-full border-zinc-400 text-zinc-400 hover:border-zinc-100 hover:text-zinc-100 transition-all"
                        onClick={(e) => handleAddToCart(e, item)}
                      >
                        <IoIosAdd className="h-6 w-6" />
                      </button>
                    ) : (
                      <div className="flex gap-2 items-center bg-zinc-600 rounded-[25px] px-2 py-1">
                        {item.quantity === 1 ? (
                          <button
                            onClick={(e) => handleAddToCart(e, item)}
                            type="button"
                            aria-label="Delete Item"
                          >
                            <MdDelete className="h-5 w-5" />
                          </button>
                        ) : (
                          <button
                            onClick={(e) => handleAddToCart(e, item)}
                            type="button"
                            aria-label="Update Quantity"
                          >
                            <FaMinus className="w-5 h-5" />
                          </button>
                        )}
                        <span>{item.quantity}</span>
                        <button
                          onClick={(e) => handleAddToCart(e, item)}
                          type="button"
                          aria-label="Add Item"
                        >
                          <IoIosAdd className="h-6 w-6" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
      {modelItem && Object.keys(modelItem).length > 0 && (
        <ModalComponent
          open={openModal}
          handleClose={handleCloseModal}
          modalTitle="food-item-details"
          className="xl:w-8/12 2xl:w-6/12 w-11/12 md:w-9/12"
        >
          <FoodItemDetails modelItem={modelItem} handleCloseModal={handleCloseModal}/>
        </ModalComponent>
      )}
    </section>
  );
};

export default MenuItemsSection;
