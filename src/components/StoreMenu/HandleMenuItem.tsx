import ModalComponent from "../Modal";
import MenuItemForm from "./MenuItemForm";
import useHandleMenuItems from "./useHandleMenuItems";
import {
  MenuCategory,
  MenuDetailType,
} from "@/redux/slice/api/store/menuSlice";

const HandleMenuItem: React.FC<{
  categories: MenuCategory[];
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setActionType: React.Dispatch<React.SetStateAction<string>>;
  actionType: string;
  menuItem?: MenuDetailType;
}> = ({
  categories,
  showModal,
  setShowModal,
  actionType,
  setActionType,
  menuItem,
}) => {
  const {
    handleCloseModal,
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
  } = useHandleMenuItems(
    showModal,
    setShowModal,
    actionType,
    setActionType,
    menuItem
  );
  return (
    <ModalComponent
      open={showModal}
      handleClose={handleCloseModal}
      modalTitle={"handle menu item"}
    >
      <MenuItemForm
        actionType={actionType}
        handleCloseModal={handleCloseModal}
        categories={categories ?? []}
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
  );
};

export default HandleMenuItem;
