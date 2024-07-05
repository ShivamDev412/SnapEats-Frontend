import { SettingsListItem } from "@/components/Settings";
import useSettings from "./useSettings";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import useDeviceType from "@/Hooks/useDeviceType";
import { SimpleSelectField } from "@/components/InputComponent";
import { LANGUAGE } from "@/utils/Constants";
import { Link } from "react-router-dom";
import { BROWSER_ROUTE } from "@/utils/Endpoints";
import ChangePassword from "@/components/Settings/ChangePassword";
const Settings = () => {
  const {
    handleEditProfile,
    switchAccount,
    isUser,
    handleSelectedLanguage,
    language,
  } = useSettings();
  const { storeStatus } = useSelector((state: RootState) => state.store);
  const isMobile = useDeviceType();
  return (
    <section className="w-full">
      <h2 className="text-3xl font-semibold mb-5">Settings</h2>
      <section className="bg-zinc-800 p-6 rounded-xl text-zinc-100 flex flex-col gap-6 h-fit w-full">
        <section className="flex flex-col gap-4 text-left">
          <h3 className="text-2xl font-semibold">Account Information</h3>
          <section className="ml-5 flex flex-col gap-2">
            <SettingsListItem
              onClick={handleEditProfile}
              title="Edit Profile"
            />
            {(storeStatus === "approved" || !isUser) && !isMobile && (
              <SettingsListItem
                onClick={switchAccount}
                title="Switch Account"
              />
            )}
            <button className="text-left font-semibold text-lg">
              Delete Account
            </button>
          </section>
        </section>
        <section className="flex flex-col gap-4 text-left">
          <h3 className="text-2xl font-semibold">Preferences</h3>
          <section className="ml-5 flex flex-col gap-2">
            <p className="text-left font-semibold text-lg">Language Settings</p>
            <SimpleSelectField
              placeholder={"Select Language"}
              data={LANGUAGE}
              defaultValue={language || "en"}
              customClasses="border-zinc-400 hover:border-zinc-100 focus-within:border-zinc-400 w-fit text-zinc-100"
              onChange={handleSelectedLanguage}
            />
          </section>
        </section>
        <section className="flex flex-col gap-4 text-left">
          <h3 className="text-2xl font-semibold">Notifications</h3>
          <section className="ml-5 flex flex-col gap-2">
            <p className="text-left font-semibold text-lg">
              Email Notifications
            </p>
            <p className="text-left font-semibold text-lg">
              Push Notifications
            </p>
          </section>
        </section>
        <section className="flex flex-col gap-4 text-left">
          <h3 className="text-2xl font-semibold">Security</h3>
          <section className="ml-5 flex flex-col gap-2">
            {!isUser ? (
              <p className="text-left font-semibold text-lg">
                Two-Factor Authentication
              </p>
            ) : (
              <ChangePassword />
            )}
          </section>
        </section>
        {isUser && (
          <section className="flex flex-col gap-4 text-left">
            <h3 className="text-2xl font-semibold">Other</h3>

            <section className="ml-5 flex flex-col gap-2">
              <p className="text-left font-semibold text-lg">Help</p>
              <Link
                to={BROWSER_ROUTE.PRIVACY_POLICY}
                className="text-left font-semibold text-lg"
              >
                Privacy Policy
              </Link>
              <Link
                to={BROWSER_ROUTE.TERMS_AND_CONDITIONS}
                className="text-left font-semibold text-lg"
              >
                Terms of Service
              </Link>
            </section>
          </section>
        )}
        <section className="flex flex-col gap-4 text-left">
          <h3 className="text-2xl font-semibold">About</h3>
          <section className="ml-5 flex flex-col gap-2">
            <p className="text-left font-semibold text-lg">Version 1.0.0</p>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Settings;
