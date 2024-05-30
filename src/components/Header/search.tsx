import { IoSearch } from "react-icons/io5";
import useSearch from "./useSearch";

const Search = () => {
  const { search, setSearch, showSearchDropdown, setSearchDropdown } =
    useSearch();
  return (
    <div className="w-6/12 relative">
      <div className="flex items-center bg-zinc-800 border border-zinc-600 rounded-[25px] p-2 gap-2 w-full z-20 absolute -top-5 left-0">
        <IoSearch />
        <input
          type="text"
          className="bg-transparent w-full focus:outline-none"
          placeholder="Search for food or restaurants"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setSearchDropdown(true)}
          onBlur={() => setSearchDropdown(false)}
        />
      </div>
      {showSearchDropdown && (
        <div className="absolute -left-2 -top-8 border border-zinc-600 rounded-2xl bg-zinc-950 bg-transparent z-10 w-[calc(100%_+_20px)] h-[3in]">
          <div className="p-4">Dropdown Content</div>
        </div>
      )}
    </div>
  );
};

export default Search;
