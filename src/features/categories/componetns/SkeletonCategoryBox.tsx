function SkeletonCategoryBox() {
  return (
    <div
      className={`transition-all duration-600 rounded-2xl overflow-hidden shadow-sm bg-gray-200 animate-pulse h-full`}
    >
      <div className="aspect-square bg-gray-300"></div>
      <div className="p-4 space-y-2">
        <div className="h-5 bg-gray-300 rounded w-3/4 mx-auto"></div>
        <div className="h-5 bg-gray-300 rounded w-1/2 mx-auto"></div>
      </div>
    </div>
  );
}

export default SkeletonCategoryBox;
