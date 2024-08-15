import { IoSearch } from "react-icons/io5";
import useSearch from "./useSearch";
import { useTranslation } from "react-i18next";
import LazyLoadedImageComponent from "../LazyLoadedImageComponent";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

const Search = () => {
  const { t } = useTranslation();
  const {
    search,
    setSearch,
    showSearchDropdown,
    setSearchDropdown,
    handleBlur,
    mostOrderedData,
    isFetching,
    handleNavigation,
    recentSearches,
  } = useSearch();

  return (
    <div className="w-full md:w-5/12 lg:w-5/12 xl:w-6/12 relative">
      <div
        className="flex items-center bg-zinc-800 border border-zinc-600 rounded-[25px] p-2 gap-2 w-full md:m-0"
        onBlur={handleBlur}
        onFocus={() => setSearchDropdown(true)}
      >
        <IoSearch />
        <input
          type="text"
          className="bg-transparent w-full focus:outline-none"
          placeholder={t("searchForFoodOrRestaurant")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {showSearchDropdown && (
        <div className="absolute sm:top-20 left-0 lg:top-10 border border-zinc-600 rounded-2xl bg-zinc-950 bg-transparent z-10 w-full h-[3in] overflow-y-auto">
          {recentSearches.length > 0 && (
            <section className="px-4 py-2">
              <h3 className="text-zinc-200 font-semibold">Recent search</h3>
              <ul className="flex flex-col gap-1 mt-2">
                {recentSearches.map((searchItem, index) => (
                  <li key={index}>
                    <Link
                      to={searchItem.url}
                      className="text-zinc-200 flex gap-1 items-center"
                      onClick={() => setSearchDropdown(false)}
                    >
                      <IoIosSearch className="h-5 w-5" />
                      {searchItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section className="px-4 py-2">
            <h3 className="text-zinc-200 font-semibold text-lg">
              Most ordered
            </h3>
            {isFetching && <p>Loading...</p>}
            <ul className="flex gap-4 my-4">
              {mostOrderedData?.data?.map((item) => (
                <li className="w-fit" key={item.storeId}>
                  <button
                    onClick={() => handleNavigation(item)}
                    className="flex flex-col items-center gap-2"
                  >
                    <LazyLoadedImageComponent
                      image={item.image}
                      alt={item.name}
                      compressedImage={item.compressedImage}
                      className="rounded-lg w-[6rem] h-[6rem]"
                    />
                    <p className="text-center text-sm">{item.name}</p>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
};

export default Search;
