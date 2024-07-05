import { useState } from "react";

const useCartItem = (noteData:string) => {
  const [note, setNote] = useState<string>(noteData);
  const handleNoteChange = (value:string) => {
    setNote(value);
  };
  return {
    note,
    handleNoteChange,
  };
};
export default useCartItem;
