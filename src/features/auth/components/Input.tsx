import { BiUser } from "react-icons/bi";

type InputProps<T extends string | number> = {
  value: T;
  setValue?: (value: T) => void;
  label?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  icon?: React.ElementType;
  showIcon?: boolean;
};

function Input<T extends string | number>({
  value,
  setValue,
  label = "Full Name",
  placeholder = "John Doe",
  type = "text",
  showIcon = true,
  icon: Icon = BiUser,
}: InputProps<T>) {
  return (
    <div className="w-full h-full">
      <label
        htmlFor={label}
        className="block text-sm font-medium mb-2 text-accent"
      >
        {label}
      </label>
      <div className="relative">
        {showIcon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
        )}

        <input
          id={label}
          type={type}
          className={`w-full ${showIcon ? "pl-10" : "pl-4"} pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all`}
          placeholder={placeholder}
          required
          value={value}
          onChange={(e) => {
            const val = e.target.value;

            if (type === "number") {
              const numVal = val === "" ? 0 : Number(val);
              setValue?.(numVal as T);
            } else {
              setValue?.(val as T);
            }
          }}
        />
      </div>
    </div>
  );
}

export default Input;
