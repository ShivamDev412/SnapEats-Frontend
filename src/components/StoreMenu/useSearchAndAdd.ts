import { useState } from "react";

const useSearchAndAdd = () => {
    const [searchMenu, setSearchMenu] = useState<string>('');
    return {searchMenu, setSearchMenu}
}
export default useSearchAndAdd