import { useGetStoreTimingQuery } from "@/redux/slice/api/store/profileSlice";
import { useState } from "react";

const useStoreTiming = () => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const handleOpenModal = (type: string) => {
    setSelectedDay(type);
    setShowModal(true);
  };
  const {data:storeTiming} = useGetStoreTimingQuery("");
  return {
    showModal,
    handleCloseModal,
    handleOpenModal,
    selectedDay,
    storeTiming,
  };
};
export default useStoreTiming;
