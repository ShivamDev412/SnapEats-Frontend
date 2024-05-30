import { useState } from "react";

const useSearch = () => {
  const [search, setSearch] = useState("");
  const [showSearchDropdown, setSearchDropdown] = useState(false);
  return { search, setSearch, showSearchDropdown, setSearchDropdown };
};
export default useSearch;