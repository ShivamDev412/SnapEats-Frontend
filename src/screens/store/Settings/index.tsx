import { SettingsListItem } from "@/components/Settings";
import useSettings from "./useSettings";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import useDeviceType from "@/Hooks/useDeviceType";

const Settings = () => {
  const { handleEditProfile, switchAccount, isUser } = useSettings();
  const { storeStatus } = useSelector((state: RootState) => state.store);
  const isMobile = useDeviceType();
  return (
    <section className="w-full lg:w-11/12">
      <h2 className="text-3xl font-semibold mb-5">Settings</h2>
      <section className="bg-zinc-800 p-6 rounded-xl text-zinc-100 flex flex-col gap-6 h-fit w-full">
        <div className="flex flex-col gap-4 text-left">
          <h3 className="text-2xl font-semibold">Account Information</h3>
          <div className="ml-5 flex flex-col gap-2">
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
          </div>
        </div>
      </section>
    </section>
  );
};

export default Settings;
