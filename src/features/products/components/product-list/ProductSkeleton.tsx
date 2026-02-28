import { memo } from "react";

function ProductSkeleton({ isGrid }: { isGrid: boolean }) {
  return (
    <div
      className={`${isGrid ? "" : "flex"} bg-white rounded-xl overflow-hidden shadow-sm animate-pulse`}
    >
      <div
        className={`${!isGrid ? "w-48 h-48" : "aspect-square"} bg-gray-200`}
      />

      <div
        className={`${!isGrid && "flex-1"} p-4 flex flex-col justify-between`}
      >
        <div>
          <div className="h-5 bg-gray-200 rounded-md w-3/4 mb-3" />

          <div className="space-y-2 mb-4">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="h-7 bg-gray-200 rounded w-20" />

          <div className="h-10 bg-gray-200 rounded-lg w-24" />
        </div>

        <div className="mt-3">
          <div className="h-3 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </div>
  );
}

export default memo(ProductSkeleton);
