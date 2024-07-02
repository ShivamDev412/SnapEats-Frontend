import { CategoryType } from "@/redux/slice/api/user/homeSlice";
import { FC } from "react";

const MenuCategories: FC<{
  categoryData: CategoryType[];
  handleCategoryClick: (category: CategoryType) => void;
}> = ({ categoryData, handleCategoryClick }) => {
  return (
    <ul className="flex gap-2 overflow-x-auto overflow-y-hidden my-5 justify-center">
      {categoryData.map((category) => (
        <li
          key={category.id}
          className={`hover:bg-primary hover:border-primary transition-all rounded-[25px] border ${
            category.isActive
              ? "bg-primary border-primary"
              : "bg-zinc-900 border-zinc-700"
          }`}
        >
          <button onClick={() => handleCategoryClick(category)} className="p-2" type="button">
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MenuCategories;
