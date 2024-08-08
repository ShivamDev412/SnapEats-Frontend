import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useSettings from "./useSettings";
import { RootState } from "@/redux/Store";
import useDeviceType from "@/Hooks/useDeviceType";
import { SimpleSelectField } from "@/components/InputComponent";
import { LANGUAGE } from "@/utils/Constants";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import { SettingsListItem, TwoFA, ChangePassword } from "@/components/Settings";
import ModalComponent from "@/components/Modal";
import Otp from "@/components/OtpInput";
import Button from "@/components/Button";

const Settings = () => {
  const {
    handleEditProfile,
    switchAccount,
    isUser,
    language,
    handleSelectedLanguage,
    verify2FAModal,
    handleModalClose,
    token,
    setToken,
    handleVerifyCode,
  } = useSettings();
  const { storeStatus } = useSelector((state: RootState) => state.store);
  const isMobile = useDeviceType();
  const { t } = useTranslation();
  return (
    <section className="w-full">
      <h2 className="text-3xl font-semibold mb-5">{t("settings")}</h2>
      <section className="bg-zinc-800 p-6 rounded-xl text-zinc-100 flex flex-col gap-6 h-fit w-full">
        <section className="flex flex-col gap-4 text-left">
          <h3 className="text-2xl font-semibold">{t("accountInfo")}</h3>
          <section className="ml-5 flex flex-col gap-2">
            <SettingsListItem
              onClick={handleEditProfile}
              title={t("editProfile")}
            />
            {(storeStatus === "approved" || !isUser) && !isMobile && (
              <SettingsListItem
                onClick={switchAccount}
                title={
                  !isUser ? <>{t("switchToUser")}</> : <>{t("switchToStore")}</>
                }
              />
            )}
            <button
              className="text-left font-semibold text-lg"
              aria-label="deleteAccount"
              type="button"
            >
              {t("deleteAccount")}
            </button>
          </section>
        </section>
        {isUser && (
          <section className="flex flex-col gap-4 text-left">
            <h3 className="text-2xl font-semibold">{t("preferences")}</h3>
            <section className="ml-5 flex flex-col gap-2">
              <p className="text-left font-semibold text-lg">
                {t("languageSettings")}
              </p>
              <SimpleSelectField
                placeholder={t("selectLanguage")}
                data={LANGUAGE}
                defaultValue={language || "en"}
                customClasses="border-zinc-400 hover:border-zinc-100 focus-within:border-zinc-400 w-fit text-zinc-100"
                onChange={handleSelectedLanguage}
              />
            </section>
          </section>
        )}

        {/* <section className="flex flex-col gap-4 text-left">
          <h3 className="text-2xl font-semibold">{t("notifications")}</h3>
          <section className="ml-5 flex flex-col gap-2">
            <p className="text-left font-semibold text-lg">
              Email Notifications
            </p>
            <p className="text-left font-semibold text-lg">
              Push Notifications
            </p>
          </section>
        </section> */}
        <section className="flex flex-col gap-4 text-left">
          <h3 className="text-2xl font-semibold">{t("security")}</h3>
          <section className="ml-5 flex flex-col gap-2">
            {isUser && (
              <>
                {!isMobile && <TwoFA />}
                <ChangePassword />
              </>
            )}
          </section>
        </section>
        {isUser && (
          <section className="flex flex-col gap-4 text-left">
            <h3 className="text-2xl font-semibold">{t("other")}</h3>

            <section className="ml-5 flex flex-col gap-2">
              <p className="text-left font-semibold text-lg">{t("help")}</p>
              <Link
                to={BROWSER_ROUTE.PRIVACY_POLICY}
                className="text-left font-semibold text-lg"
              >
                {t("privacyPolicy")}
              </Link>
              <Link
                to={BROWSER_ROUTE.TERMS_AND_CONDITIONS}
                className="text-left font-semibold text-lg"
              >
                {t("termsOfService")}
              </Link>
            </section>
          </section>
        )}
        <section className="flex flex-col gap-4 text-left">
          <h3 className="text-2xl font-semibold">{t("about")}</h3>
          <section className="ml-5 flex flex-col gap-2">
            <p className="text-left font-semibold text-lg">Version 1.0.0</p>
          </section>
        </section>
      </section>
      <ModalComponent
        open={verify2FAModal}
        handleClose={handleModalClose}
        modalTitle="Verify 2FA Token"
      >
        <div className="flex flex-col gap-6 justify-center w-full">
          <h2 className="text-2xl font-semibold text-center">
            Enter 2FA Token
          </h2>
          <div className="flex justify-center">
            <Otp
              separator={<span> </span>}
              value={token}
              onChange={setToken}
              length={6}
            />
          </div>

          <Button onClick={handleVerifyCode}>Verify</Button>
        </div>
      </ModalComponent>
    </section>
  );
};

export default Settings;
