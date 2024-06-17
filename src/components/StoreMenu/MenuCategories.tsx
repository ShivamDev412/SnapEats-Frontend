import { MenuCategory } from "@/redux/slice/api/store/menuSlice";
import { setSelectedCategory } from "@/redux/slice/storeSlice";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { RootState } from "@/redux/Store";

type CategoryItemProps = {
  category: MenuCategory;
  handleSelectCategory: (category: string) => void;
  selectedCategory: string;
};

const CategoryItem: React.FC<CategoryItemProps> = ({
  category,
  handleSelectCategory,
  selectedCategory,
}) => {
  return (
    <button
      className={`border rounded-[25px] px-4 py-2  flex items-center gap-2 transition-all font-semibold ${
        selectedCategory === category.value
          ? "bg-primary text-zinc-100 border-primary"
          : "border-zinc-700"
      }`}
      onClick={() => handleSelectCategory(category.value)}
    >
      <p>{category.label}</p>
      <p
        className={`${
          selectedCategory !== category.value
            ? " bg-zinc-100 text-zinc-950"
            : "bg-zinc-100 text-primary"
        } rounded-full h-5 w-5 flex transition-all justify-center text-[0.8rem] items-center`}
      >
        {category.menuCount}
      </p>
    </button>
  );
};

const MenuCategories: React.FC<{ categories: MenuCategory[] }> = ({
  categories,
}) => {
  const dispatch = useDispatch();
  const { selectedCategory } = useSelector((state: RootState) => state.store);

  const handleSelectCategory = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const categoryToDisplay = React.useMemo(() => {
    return categories.filter((category) => category.menuCount > 0);
  }, [categories]);

  const totalCount = React.useMemo(() => {
    return categoryToDisplay.reduce((acc, category) => {
      return acc + category.menuCount;
    }, 0);
  }, [categoryToDisplay]);

  return (
    <section className="my-10 flex flex-wrap gap-4">
      <CategoryItem
        category={{ label: "All", value: "all", menuCount: totalCount }}
        handleSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
      />
      {categoryToDisplay.map((category) => (
        <CategoryItem
          key={category.value}
          category={category}
          handleSelectCategory={handleSelectCategory}
          selectedCategory={selectedCategory}
        />
      ))}
    </section>
  );
};

export default MenuCategories;
