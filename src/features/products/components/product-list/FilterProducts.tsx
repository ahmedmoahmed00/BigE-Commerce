import RangeMaxPriceFilter from "./RangeMaxPriceFilter";
import SearchProducts from "./SearchProducts";
import CategoriesFilter from "./CategoriesFilter";
import { useCallback, useEffect, useState } from "react";
import useGetMaxPrice from "../../hooks/useGetMaxPrice";
import { useSearchParams } from "react-router-dom";
import { IoFunnelOutline } from "react-icons/io5";

function FilterProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: maxPriceData, isLoading: isLoadingMaxPrice } = useGetMaxPrice();
  const max_Price = maxPriceData ? Math.round(maxPriceData) : null;

  const searchURL = searchParams.get("search");
  const [searchValue, setSearchValue] = useState(searchURL || "");

  const categorySelected = searchParams.get("category") || "all";

  const priceInUrl = searchParams.get("price_lte")
    ? Number(searchParams.get("price_lte"))
    : null;

  const [rangeValue, setRangeValue] = useState<number | null>(null);

  const displayValue = rangeValue !== null ? rangeValue : priceInUrl;

  useEffect(() => {
    setSearchValue(searchURL || "");
  }, [searchURL]);

  useEffect(() => {
    setRangeValue(priceInUrl);
  }, [priceInUrl]);

  const updateParams = useCallback(
    (updates: Record<string, string | null>, replace = false) => {
      if (Object.entries(updates).length === 0 || !updates) {
        return;
      }

      setSearchParams(
        (searchParams) => {
          Object.entries(updates).forEach(([key, value]) => {
            if (value && value !== null) {
              searchParams.set(key, value);
            } else {
              searchParams.delete(key);
            }
          });

          return searchParams;
        },
        { replace },
      );
    },
    [setSearchParams],
  );

  const handelResetFilters = () => {
    setSearchParams({});
  };

  return (
    <div>
      <header className="flex items-center gap-2 mb-6">
        <span className="text-xl">
          <IoFunnelOutline />
        </span>
        <span className="font-semibold">Filters</span>
      </header>
      <div className="flex flex-col gap-6">
        <SearchProducts
          updateParams={updateParams}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          searchURL={searchURL}
        />
        <CategoriesFilter
          updateParams={updateParams}
          categorySelected={categorySelected}
        />
        <RangeMaxPriceFilter
          updateParams={updateParams}
          maxPrice={max_Price}
          isLoadingMaxPrice={isLoadingMaxPrice}
          displayValue={displayValue}
          setRangeValue={setRangeValue}
          rangeValue={rangeValue}
          priceInUrl={priceInUrl}
        />
        <button
          onClick={handelResetFilters}
          className="w-full cursor-pointer py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default FilterProducts;
