import React from 'react';

interface RadioButtonProps {
  name: string;
  id: string;
  ariaLabel: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ name, id, ariaLabel, checked, onChange }) => {
  return (
    <label className="relative flex items-center cursor-pointer text-lg user-select-none pl-5">
      <input
        type="radio"
        name={name}
        id={id}
        aria-label={ariaLabel}
        checked={checked}
        onChange={onChange}
        className="absolute opacity-0 cursor-pointer h-0 w-0"
      />
      <span
        className={`absolute left-0 -top-[10px] h-5 w-5 bg-gray-300 rounded-full transition-colors duration-200 ease-in-out ${
          checked ? 'bg-zinc-950' : 'bg-gray-300'
        }`}
      >
        {checked && <span className="absolute top-[0.3rem] left-[5px] h-[10px] w-[10px] rounded-full bg-white"></span>}
      </span>
    </label>
  );
};

export default RadioButton;
