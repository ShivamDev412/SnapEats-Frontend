import {
  SearchAndAdd,
  HandleMenuItem,
  MenuCategories,
  MenuItems,
} from "@/components/StoreMenu";
import useMenu from "./useMenu";
import ModalComponent from "@/components/Modal";

const Menu = () => {
  const {
    handleMenuItem,
    showModal,
    handleCloseModal,
    actionType,
    categories,
    isFetching,
    handleSubmit,
    onSubmit,
    register,
    errors,
    setValue,
    optionFields,
    appendOption,
    removeOption,
    appendChoice,
    removeChoice,
    watchedOptions,
    control,
    isLoading,
    getValues,
  } = useMenu();
  if (isFetching) {
    return <div>Loading...</div>;
  }
  return (
    <section className="w-10/12">
      <h2 className="text-3xl font-semibold mb-10">Your Menu</h2>
      <SearchAndAdd handleMenuItem={handleMenuItem} />
      <MenuCategories categories={categories?.data ?? []} />
      <MenuItems />
      <ModalComponent
        open={showModal}
        handleClose={handleCloseModal}
        modalTitle={"handle menu item"}
      >
        <HandleMenuItem
          actionType={actionType}
          handleCloseModal={handleCloseModal}
          categories={categories?.data ?? []}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          optionFields={optionFields}
          appendOption={appendOption}
          removeOption={removeOption}
          appendChoice={appendChoice}
          removeChoice={removeChoice}
          watchedOptions={watchedOptions}
          control={control}
          isLoading={isLoading}
        />
      </ModalComponent>
    </section>
  );
};

export default Menu;
