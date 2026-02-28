function OrderHistorySkeletonCard() {
  return (
    <div className="bg-primary rounded-2xl p-6 shadow-sm animate-pulse">
      <header className="flex items-start justify-between mb-4">
        <div className="space-y-2">
          <div className="h-5 w-32 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-24 bg-gray-100 rounded-md"></div>
        </div>
        <div className="h-7 w-20 bg-green-50 rounded-full"></div>
      </header>

      <main className="space-y-4 mb-6">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="size-12 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-3 w-1/4 bg-gray-100 rounded"></div>
            </div>
          </div>
        ))}
      </main>

      <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="size-4 bg-gray-200 rounded-full mr-2"></div>
          <div className="h-4 w-40 bg-gray-100 rounded"></div>
        </div>
        <div className="h-5 w-24 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
}

export default OrderHistorySkeletonCard;
