import { FC } from "react";
import { IoPhonePortraitOutline } from "react-icons/io5";
import Button from "../Button";
import IsVerified from "../IsVerified";
import ModalComponent from "../Modal";
import useAdditionalDetails from "./useAdditionalDetails";
import AddPhoneNumber from "./AddPhoneNumber";
import VerifyCredentials from "./VerifyCredentials";

const AdditionalDetails: FC<{
  phoneNumber: string;
  phoneNumberVerified: boolean;
  countryCode: string;
}> = ({ phoneNumber, phoneNumberVerified, countryCode }) => {
  const {
    openModal,
    handleCloseModal,
    register,
    handleSubmit,
    onSubmit,
    errors,
    getValues,
    setValue,
    isLoading,
    addPhoneNumber,
    handleUpdatePhoneNumber,
    verifyPhoneNumber,
    modalOperation,
    updateStorePhoneNumberLoading
  } = useAdditionalDetails();
  return (
    <section className="flex flex-col gap-2 md:gap-6">
      <h3 className="text-lg md:text-xl font-bold">Additional Information</h3>
      <div>
        {phoneNumber ? (
          <div className="flex gap-4 items-center">
            <div className="flex gap-5 flex-col">
              <div className="flex items-center gap-2">
                <IoPhonePortraitOutline className="text-xl" />
                <p className="font-semibold mr-4 text-sm md:text-[16px]">
                  {countryCode} {phoneNumber}
                </p>
                {phoneNumberVerified ? (
                  <IsVerified verified={true} />
                ) : (
                  <IsVerified
                    verified={false}
                    onClick={() => verifyPhoneNumber()}
                  />
                )}
              </div>
              <Button
                className="px-2 bg-green-800 text-sm md:text-[1rem]"
                onClick={() =>
                  handleUpdatePhoneNumber({ countryCode, phoneNumber })
                }
              >
                Update Phone Number
              </Button>
            </div>
          </div>
        ) : (
          <Button
            className="px-2 bg-green-800 text-[1rem]"
            onClick={addPhoneNumber}
          >
            Add Phone Number
          </Button>
        )}
      </div>
      <ModalComponent
        open={openModal}
        handleClose={handleCloseModal}
        modalTitle={"add-phone-number"}
      >
        {modalOperation === "phoneNumber" ? (
          <AddPhoneNumber
            register={register}
            getValues={getValues}
            errors={errors}
            setValue={setValue}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            isLoading={isLoading || updateStorePhoneNumberLoading}
          />
        ) : (
          <VerifyCredentials
            phoneNumber={`${countryCode} ${phoneNumber}`}
            handleCloseModal={handleCloseModal}
            type={"phoneNumber"}
            email=""
          />
        )}
      </ModalComponent>
    </section>
  );
};

export default AdditionalDetails;
