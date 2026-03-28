import { useState, useRef, useEffect } from "react";

interface Option {
  label: string;
  value: string;
}

const CheckIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface SelectProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: Option[];
  placeholder?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const Select = ({
  label = "",
  value,
  onChange,
  options = [],
  placeholder = "Select range",
  disabled = false,
  icon,
}: SelectProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string>(
    options[0]?.value ?? "",
  );
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const selected = isControlled ? value : internalValue;
  const selectedOption = options.find((o) => o.value === selected);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (val: string) => {
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((v) => !v);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-flex flex-col gap-1.5 w-full"
    >
      <span className="text-[0.6875rem] font-label font-bold text-outline-variant px-1 tracking-widest select-none">
        {label}
      </span>

      <div
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setOpen((v) => !v)}
        onKeyDown={handleKeyDown}
        className={[
          "flex items-center justify-between",
          "px-3 py-2.5 gap-3",
          "bg-surface-container-lowest rounded-lg border border-gray-200",
          "shadow-sm cursor-pointer select-none outline-none",
          "transition-all duration-150",
          open
            ? "border-blue-400 ring-2 ring-blue-100"
            : "hover:border-gray-300",
          disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "",
        ].join(" ")}
      >
        <span
          className={`text-sm font-normal flex-1 truncate ${selectedOption ? "text-gray-800" : "text-gray-400"}`}
        >
          {selectedOption?.label ?? placeholder}
        </span>

        <span className="shrink-0 flex items-center text-outline text-lg pointer-events-none">
          {icon}
        </span>
      </div>

      {open && (
        <ul
          role="listbox"
          className="absolute top-full left-0 right-0 z-50 mt-1.5 py-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden animate-fadeSlideIn"
        >
          {options.map((opt) => {
            const isSelected = opt.value === selected;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                className={[
                  "flex items-center justify-between px-3 py-2 text-sm cursor-pointer transition-colors duration-100",
                  isSelected
                    ? "text-blue-600 font-medium bg-blue-50"
                    : "text-gray-700 hover:bg-gray-50",
                ].join(" ")}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <span className="text-blue-500">
                    <CheckIcon />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
