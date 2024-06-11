import useStoreRegister from "./useStoreRegister";
import SearchLocation from "@/components/SearchLocation";
import { countryCode } from "@/utils/Constants";
import Button from "@/components/Button";
import { TextInput, SelectField } from "@/components/InputComponent";
const PendingRequest = () => {
  return (
    <section className="text-zinc-100 text-center flex flex-col gap-2">
      <h2 className="text-3xl font-semibold">
        Your Store Registration is in progress
      </h2>
      <p className="text-xl">Please be patient as it may take from 12-48 hrs</p>
      <p className="text-lg">
        Once your restaurant details have been verified by our team, you will be
        granted access to your store panel.
      </p>
    </section>
  );
};
const StoreRegister = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    isLoading,
    storeStatus,
  } = useStoreRegister();
  return (
    <section className="w-full mx-auto text-zinc-900 h-fit my-auto">
      {storeStatus === "not-registered" ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 lg:w-6/12 2xl:w-4/12 mx-auto bg-zinc-100 p-6 rounded-lg"
        >
          <h2 className="text-3xl text-center font-semibold mb-5">
            Register Your Store
          </h2>
          <TextInput
            id="name"
            type="text"
            register={register}
            errors={errors}
            placeholder="Store Name"
          />
          <TextInput
            id="email"
            type="email"
            register={register}
            errors={errors}
            placeholder="Store Email"
          />
          <SearchLocation
            id={"address"}
            placeholder={"Store Location"}
            register={register}
            errors={errors}
            setValue={setValue}
          />
          <div className="flex gap-4">
            <div className="w-4/12">
              <SelectField
                id="countryCode"
                register={register}
                placeholder="Country Code"
                errors={errors}
                data={countryCode}
              />
            </div>
            <TextInput
              id="phoneNumber"
              type="number"
              register={register}
              errors={errors}
              placeholder="Phone Number"
            />
          </div>

          <Button type="submit" isLoading={isLoading}>
            Submit
          </Button>
        </form>
      ) : (
        <PendingRequest />
      )}
    </section>
  );
};

export default StoreRegister;
