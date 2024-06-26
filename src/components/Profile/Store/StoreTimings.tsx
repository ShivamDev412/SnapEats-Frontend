import { FaRegEdit } from "react-icons/fa";
import moment from "moment-timezone";
import ModalComponent from "../../Modal";
import StoreTimingForm from "./StoreTimingForm";
import useStoreTiming from "./useStoreTiming";
const Days = ({
  title,
  handleOpenModal,
  openTime,
  closeTime,
}: {
  title: string;
  handleOpenModal: (type: string) => void;
  openTime: Date | null;
  closeTime: Date | null;
}) => {
  const formattedTime1 = moment(openTime)
    .tz("America/Toronto")
    .format("hh:mm A");
  const formattedTime2 = moment(closeTime)
    .tz("America/Toronto")
    .format("hh:mm A");
  return (
    <div className="flex items-center gap-2">
      <h4>{title}:</h4>
      {openTime && closeTime && (
        <>
          <span>{openTime && formattedTime1}</span>-
          <span>{closeTime && formattedTime2}</span>
        </>
      )}
      <button
        onClick={() =>
          handleOpenModal(title === "Normal Days" ? "normalDay" : "specialDay")
        }
      >
        <FaRegEdit />
      </button>
    </div>
  );
};
const StoreTimings = () => {
  const {
    handleOpenModal,
    handleCloseModal,
    showModal,
    selectedDay,
    storeTiming,
  } = useStoreTiming();
  const { openTime, closeTime, specialEventCloseTime, specialEventOpenTime } = {
    ...storeTiming?.data,
  };
  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-lg lg:text-xl font-bold ">Store Timing</h3>
      <Days
        title="Normal Days"
        handleOpenModal={handleOpenModal}
        openTime={openTime || null}
        closeTime={closeTime || null}
      />
      <Days
        title="Special Days"
        handleOpenModal={handleOpenModal}
        openTime={specialEventOpenTime || null}
        closeTime={specialEventCloseTime || null}
      />
      <ModalComponent
        open={showModal}
        handleClose={handleCloseModal}
        modalTitle={"store-timings"}
      >
        <StoreTimingForm
          selectedDay={selectedDay}
          handleCloseModal={handleCloseModal}
        />
      </ModalComponent>
    </section>
  );
};

export default StoreTimings;
