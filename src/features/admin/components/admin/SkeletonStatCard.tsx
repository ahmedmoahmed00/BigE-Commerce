function SkeletonStatCard() {
  return (
    <div className="bg-primary rounded-2xl p-6 shadow-sm w-full animate-pulse">
      <div className="flex items-start gap-2 justify-between mb-4">
        <div className="p-6 rounded-lg bg-gray-200 w-12 h-12"></div>

        <div className="h-4 bg-gray-200 rounded w-16 mt-2"></div>
      </div>

      <div>
        <div className="h-8 bg-gray-200 rounded w-24 mb-2"></div>

        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
}

export default SkeletonStatCard;
