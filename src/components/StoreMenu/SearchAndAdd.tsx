import { IoSearch } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import Button from "../Button";
import useSearchAndAdd from "./useSearchAndAdd";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setActionType: any;
};
const SearchAndAdd: React.FC<Props> = ({ setShowModal, setActionType }) => {
  const { searchMenu, setSearchMenu } = useSearchAndAdd();
  return (
    <section className="flex gap-4 items-center">
      <div className="flex items-center bg-zinc-800 border border-zinc-600 rounded-[25px] p-2 gap-2 mt-2 md:m-0 w-6/12">
        <IoSearch />
        <input
          type="text"
          className="bg-transparent w-full focus:outline-none"
          placeholder="Search for menu items"
          value={searchMenu}
          onChange={(e) => setSearchMenu(e.target.value)}
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
