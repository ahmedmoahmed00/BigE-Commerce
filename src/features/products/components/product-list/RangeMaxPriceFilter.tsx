import { memo, useEffect } from "react";
import { formatCurrency } from "../../../../shared/utils/helpers";
import type { SetURLSearchParams } from "react-router-dom";

type RangeMaxPriceFilterType = {
  setRangeValue: React.Dispatch<React.SetStateAction<number | null>>;
  rangeValue: number | null;
  maxPrice: number | null;
  isLoadingMaxPrice: boolean;
  setSearchParams?: SetURLSearchParams;
  displayValue: number | null;
  updateParams: (
    updates: Record<string, string | null>,
    replace?: boolean,
  ) => void;
  priceInUrl: number | null;
};

function RangeMaxPriceFilter({
  setRangeValue,
  maxPrice,
  isLoadingMaxPrice,
  updateParams,
  displayValue,
  rangeValue,
  priceInUrl,
}: RangeMaxPriceFilterType) {
  useEffect(() => {
    if (!isLoadingMaxPrice && maxPrice != null && displayValue === null) {
      setRangeValue(maxPrice);
    }
  }, [isLoadingMaxPrice, maxPrice, displayValue, setRangeValue]);

  const handleFinalChange = (value: string) => {
    if (rangeValue === priceInUrl) {
      return;
    }

    if (rangeValue !== null) {
      updateParams({ price_lte: value }, false);

      setTimeout(() => {
        setRangeValue(null);
      }, 100);
    }
  };

  const finalValue = displayValue !== null ? displayValue : maxPrice;

  return (
    <>
      {finalValue === null && isLoadingMaxPrice ? (
        <div>isLoading</div>
      ) : (
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-sm" htmlFor="range">
            Price Range: {formatCurrency(0, 0)} -{" "}
            {formatCurrency(Math.round(finalValue || 0), 0)}
          </label>
          <input
            id="range"
            type="range"
            min={0}
            max={maxPrice || 0}
            value={finalValue || 0}
            onChange={(e) => setRangeValue(Number(e.target.value))}
            onMouseUp={(e: React.MouseEvent<HTMLInputElement>) => {
              handleFinalChange(e.currentTarget.value);
            }}
            onTouchEnd={(e: React.TouchEvent<HTMLInputElement>) => {
              handleFinalChange(e.currentTarget.value);
            }}
          />
        </div>
      )}
    </>
  );
}
export default memo(RangeMaxPriceFilter);
