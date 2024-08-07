import useFormHandler from "@/Hooks/useFormHandler";
import { StoreTimingSchema } from "@/Schema/Store.Schema";
import {
  StoreTiming,
  useGetStoreTimingQuery,
  useUpdateStoreTimingMutation,
} from "@/redux/slice/api/store/profileSlice";
import { DEFAULT_VALUES } from "@/utils/Constants";
import Toast from "@/utils/Toast";
import moment from "moment";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

const useStoreTimingForm = (
  selectedDay: string,
  handleCloseModal: () => void
) => {
  type FormField = z.infer<typeof StoreTimingSchema>;
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    formState: { errors },
  } = useFormHandler<StoreTiming>(
    DEFAULT_VALUES.STORE_TIMING,
    StoreTimingSchema
  );
  const [setStoreTiming, { isLoading }] = useUpdateStoreTimingMutation();
  const { data: storeTiming } = useGetStoreTimingQuery("");
  const { openTime, closeTime, specialEventCloseTime, specialEventOpenTime } = {
    ...storeTiming?.data,
  };
  useEffect(() => {
    if (selectedDay === "normalDay") {
      openTime &&
        setValue(
          "openTime",
          moment(openTime).tz("America/Toronto").format("HH:mm")
        );
      closeTime &&
        setValue(
          "closeTime",
          moment(closeTime).tz("America/Toronto").format("HH:mm")
        );
    } else {
      specialEventOpenTime &&
        setValue(
          "openTime",
          moment(specialEventOpenTime).tz("America/Toronto").format("HH:mm")
        );
      specialEventCloseTime &&
        setValue(
          "closeTime",
          moment(specialEventCloseTime).tz("America/Toronto").format("HH:mm")
        );
    }
  }, [
    storeTiming,
    setValue,
    selectedDay,
    openTime,
    closeTime,
    specialEventOpenTime,
    specialEventCloseTime,
  ]);
  const onSubmit: SubmitHandler<FormField> = async (credentials) => {
    const currentDate = moment().format("YYYY-MM-DD");
    const openTimeDateTime = moment
      .tz(
        `${currentDate} ${credentials.openTime}`,
        "YYYY-MM-DD HH:mm",
        "America/Toronto"
      )
      .toISOString();
    const closeTimeDateTime = moment
      .tz(
        `${currentDate} ${credentials.closeTime}`,
        "YYYY-MM-DD HH:mm",
        "America/Toronto"
      )
      .toISOString();
    const response = await setStoreTiming({
      type: selectedDay,
      openTime: openTimeDateTime,
      closeTime: closeTimeDateTime,
    });
    try {
      if (response.data) {
        Toast("Store time updated successfully", "success");
        handleCloseModal();
        reset();
        clearErrors();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      Toast(err.message, "error");
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
  };
};
export default useStoreTimingForm;
