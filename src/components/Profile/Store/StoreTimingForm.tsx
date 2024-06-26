import { TextInput } from "@/components/InputComponent";
import useStoreTimingForm from "./useStoreTimingForm";
import Button from "@/components/Button";

const StoreTimingForm = ({
  selectedDay,
  handleCloseModal,
}: {
  selectedDay: string;
  handleCloseModal: () => void;
}) => {
  const { register, handleSubmit, errors, onSubmit, isLoading } =
    useStoreTimingForm(selectedDay, handleCloseModal);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h3 className="text-2xl font-semibold text-center flex gap-1 items-center justify-center">
        {selectedDay === "normalDay" ? "Normal Days" : "Special Days"} Store
        Timing
      </h3>
      <div className="my-4 flex gap-4 flex-col">
        <TextInput
          register={register}
          errors={errors}
          type="time"
          placeholder="Opening Time"
          id="openTime"
        />
        <TextInput
          register={register}
          errors={errors}
          type="time"
          placeholder="Closing Time"
          id="closeTime"
        />
        <Button type="submit" isLoading={isLoading}>
          Set Time
        </Button>
      </div>
    </form>
  );
};

export default StoreTimingForm;
