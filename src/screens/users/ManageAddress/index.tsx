import Button from "@/components/Button";
import { FaLocationDot } from "react-icons/fa6";
import useManageAddress from "./useManageAddress";
import ModalComponent from "@/components/Modal";
import { AddAddress, UserAddress } from "@/components/ManageAddress";

const ManageAddress = () => {
  const {
    openModal,
    handleCloseModal,
    handleAddAddress,
    onSubmit,
    register,
    handleSubmit,
    getValues,
    errors,
    setValue,
    isLoading,
    handleUpdateAddress,
    isUpdateAddressLoading,
  } = useManageAddress();
  return (
    <div className="flex flex-col h-full">
      <section className="flex justify-between">
        <h2 className="text-3xl font-semibold">Your Address</h2>
        <Button
          className="bg-green-800 flex items-center gap-2"
          type="button"
          onClick={handleAddAddress}
        >
          <FaLocationDot />
          Add Address
        </Button>
      </section>
      <UserAddress handleUpdateAddress={handleUpdateAddress} />
      <ModalComponent
        open={openModal}
        handleClose={handleCloseModal}
        modalTitle={"add-address"}
      >
        <AddAddress
          register={register}
          getValues={getValues}
          errors={errors}
          setValue={setValue}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          isLoading={isLoading || isUpdateAddressLoading}
        />
      </ModalComponent>
    </div>
  );
};

export default ManageAddress;
