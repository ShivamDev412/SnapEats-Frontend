import { useTranslation } from "react-i18next";
import ModalComponent from "../Modal";
import ChangePasswordForm from "./ChangePasswordForm";
import SettingsListItem from "./SettingsListItem";
import useChangePassword from "./useChangePassword";

const ChangePassword = () => {
  const { showModal, handleCloseModal, changePassword } = useChangePassword();
  const {t} = useTranslation();
  return (
    <>
      <SettingsListItem onClick={changePassword} title={t('changePassword')} />
      <ModalComponent
        open={showModal}
        handleClose={handleCloseModal}
        modalTitle={"add-phone-number"}
      >
        <ChangePasswordForm handleCloseModal={handleCloseModal}/>
      </ModalComponent>
    </>
  );
};
export default ChangePassword;
