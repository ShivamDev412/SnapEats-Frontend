import { IoSearch } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import Button from "../Button";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setActionType: React.Dispatch<React.SetStateAction<string>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};
const SearchAndAdd: React.FC<Props> = ({
  setShowModal,
  setActionType,
  searchValue,
  setSearchValue,
}) => {
  return (
    <section className="flex gap-4 items-center">
      <div className="flex items-center bg-zinc-800 border border-zinc-600 rounded-[25px] p-2 gap-2 mt-2 md:m-0 w-6/12">
        <IoSearch />
        <input
          type="text"
          className="bg-transparent w-full focus:outline-none"
          placeholder="Search for menu items"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <Button
        className="bg-green-800"
        onClick={() => {
          setActionType("add");
          setShowModal(true);
        }}
      >
        <IoIosAdd className="fill-white h-7 w-auto" /> Add New Item
      </Button>
    </section>
  );
};

export default SearchAndAdd;
