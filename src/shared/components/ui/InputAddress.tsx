// import { useEffect } from "react";
import { useEffect } from "react";
import { useGeolocation } from "../../hooks/useGeolocation";
import useGetAddress from "../../hooks/useGetAddress";
import { FiMapPin } from "react-icons/fi";

type InputProps<T extends string | number> = {
  value: T;
  setValue: (value: T) => void;
  label?: string;
  placeholder?: string;
  icon?: React.ElementType;
  showIcon?: boolean;
};

function InputAddress<T extends string | number>({
  value,
  setValue,
  label,
  placeholder,
  showIcon = false,
  icon: Icon = FiMapPin,
}: InputProps<T>) {
  const { data, mutate } = useGetAddress();
  const { isLoading, error, getPosition, position } = useGeolocation();

  const handleGetPosition = () => {
    getPosition();
  };

  useEffect(() => {
    if (position) {
      mutate({ latitude: position.lat, longitude: position.lng });
    }
  }, [position]);

  useEffect(() => {
    if (data) {
      setValue(data.address as unknown as T);
    }
  }, [data]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2 text-accent">
        {label}
      </label>

      <div className="flex flex-col gap-2">
        <div className="relative w-full h-12.5">
          {showIcon && (
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 z-10 pointer-events-none" />
          )}

          <textarea
            className={`${showIcon ? "pl-10" : "pl-4"} pr-4 sm:pr-32 w-full h-full resize-none py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all`}
            placeholder={placeholder}
            required
            value={value}
            onChange={(e) => setValue(e.target.value as unknown as T)}
          />

          <button
            disabled={isLoading}
            onClick={handleGetPosition}
            className="hidden sm:block absolute right-1 top-1/2 -translate-y-1/2 w-30 py-2 rounded-full text-primary cursor-pointer bg-secondary text-sm hover:opacity-90 transition-all z-10"
          >
            Get position
          </button>
        </div>

        <button
          disabled={isLoading}
          onClick={handleGetPosition}
          className="block sm:hidden w-full py-3 rounded-lg text-primary cursor-pointer bg-secondary text-sm font-medium"
        >
          Get position
        </button>
      </div>
    </div>
  );
}

export default InputAddress;
