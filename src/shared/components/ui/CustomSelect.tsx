import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import type { Option } from "../../../features/admin/types";

interface CustomSelectProps {
  options: Option[];
  value: string | number;
  onChange: (option: Option) => void;
  label: string;
}

export function CustomSelect({
  options,
  value,
  onChange,
  label,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative w-full" ref={ref}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 border border-gray-300 rounded-lg bg-white cursor-pointer hover:border-secondary transition-colors"
      >
        <span className={selectedOption ? "text-black" : "text-gray-400"}>
          {selectedOption ? selectedOption.label : "Select Category..."}
        </span>
        <FiChevronDown
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <ul className="absolute z-100 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`px-4 py-2 hover:bg-secondary hover:text-primary cursor-pointer text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${
                option.value === value
                  ? "bg-secondary text-primary font-semibold"
                  : ""
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
