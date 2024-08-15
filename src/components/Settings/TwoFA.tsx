import { useTranslation } from "react-i18next";
import ToggleInput from "../InputComponent/ToggleInput";
import ModalComponent from "../Modal";
import use2FA from "./use2fa";

const TwoFA = () => {
  const { is2FAEnabled, handleToggle2FA, qrCode, openModal, handleCloseModal } =
    use2FA();
  const {t} = useTranslation();
  return (
    <>
      <ToggleInput
        id="2fa"
        label="Enable 2FA for your account"
        value={is2FAEnabled}
        onChange={handleToggle2FA}
      />
      <ModalComponent
        open={openModal}
        handleClose={handleCloseModal}
        modalTitle={t("enable2FA")}
      >
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Two-Factor Authentication</h2>
          <p className="mb-4">
            Scan the QR code with your authenticator app to enable two-factor
            authentication.
          </p>
          <div className="mb-4">
            {qrCode && <img src={qrCode} alt="QR Code" className="mx-auto" />}
          </div>
        </div>
      </ModalComponent>
    </>
  );
};

export default TwoFA;
