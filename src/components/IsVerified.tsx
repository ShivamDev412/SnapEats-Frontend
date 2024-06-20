import { useTranslation } from "react-i18next";
import Button from "./Button";

const IsVerified = ({
  verified,
  onClick,
}: {
  verified: boolean;
  onClick?: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <>
      {verified ? (
        <div className="px-2 py-[0.2rem] rounded-[25px] border-2 border-green-800 items-center">
          <p className="font-medium text-center text-[12px] xl:text-sm text-green-800">
            {t("verified")}
          </p>
        </div>
      ) : (
        <Button
          className="px-2 py-[0.2rem] rounded-[25px] border-2 border-red-800 items-center bg-transparent text-red-800 text-[12px] xl:text-sm"
          onClick={onClick}
        >
          {t('notVerified')}
        </Button>
      )}
    </>
  );
};

export default IsVerified;
