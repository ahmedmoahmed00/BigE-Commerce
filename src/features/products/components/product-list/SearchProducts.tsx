import { memo, useEffect } from "react";
import { useDebounce } from "../../../../shared/hooks/useDebounce";

type SearchProductsProps = {
  updateParams: (
    updates: Record<string, string | null>,
    replace?: boolean,
  ) => void;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchURL: string | null;
};

function SearchProducts({
  updateParams,
  searchValue,
  setSearchValue,
  searchURL,
}: SearchProductsProps) {
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    if (searchURL === searchValue) {
      return;
    }
    const trimmedSearch = debouncedSearch.trim();

    if (trimmedSearch.length > 0) {
      updateParams({ search: trimmedSearch }, false);
    }
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="search" className="font-semibold text-sm">
        Search
      </label>
      <input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        type="text"
        id="search"
        placeholder="Search products..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default memo(SearchProducts);
