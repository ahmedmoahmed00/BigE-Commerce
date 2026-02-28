import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../../../shared/hooks/useDebounce";

function InputSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("query") || "");

  const debouncedValue = useDebounce(value, 300);

  const handleSearch = () => {
    const finalDebouncedValue = debouncedValue.trim();

    if (finalDebouncedValue) {
      if (searchParams.get("page")) {
        searchParams.delete("page");
      }

      searchParams.set("query", finalDebouncedValue);

      setSearchParams(searchParams);
    } else {
      searchParams.delete("query");
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    if (debouncedValue === value) {
      handleSearch();
    }
  }, [debouncedValue, value]);

  return (
    <div className="bg-primary rounded-xl p-4 shadow-sm">
      <div className="relative">
        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
      </div>
    </div>
  );
}

export default InputSearch;
