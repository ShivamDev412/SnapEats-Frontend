const SettingsListItem = ({
  onClick,
  title,
}: {
  onClick: () => void;
  title: string;
}) => {
  return (
    <button className="text-left font-semibold text-lg" onClick={onClick}>
      {title}
    </button>
  );
};

export default SettingsListItem;
