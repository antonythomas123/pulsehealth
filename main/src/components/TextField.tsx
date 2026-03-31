import React from "react";

type Props = {
  label: string;
  placeholder: string;
  type: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  endIconClick?: () => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = ({
  label,
  placeholder,
  type,
  startIcon,
  endIcon,
  endIconClick,
  value,
  onChange
}: Props) => {
  return (
    <div className="space-y-2">
      <label className="text-on-surface-variant font-headline text-[11px] font-bold uppercase tracking-[0.1em] ml-1">
        {label}
      </label>
      <div className="relative group">
        {startIcon && (
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline/40 group-focus-within:text-primary transition-colors">
            {startIcon}
          </div>
        )}
        <input
          className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-primary focus:ring-4 focus:ring-primary/5 text-sm py-4 pl-12 pr-4 rounded-xl transition-all duration-300 placeholder:text-outline/40 font-medium"
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
        />

        {endIcon && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 hover:text-primary transition-colors"
            type="button"
            onClick={endIconClick}
          >
            {endIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default TextField;
