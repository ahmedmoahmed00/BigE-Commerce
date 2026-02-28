export default function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="mb-6">
        <div className="h-6 w-20 bg-gray-200 rounded-md"></div>
      </div>

      <div className="p-8 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-200 w-full h-full"></div>

          <div>
            <div className="space-y-4">
              <div className="h-8 w-24 bg-blue-50 rounded-full"></div>

              <div className="h-10 w-3/4 bg-gray-200 rounded-md"></div>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="size-6 bg-gray-200 rounded-full"
                    ></div>
                  ))}
                </div>
                <div className="h-5 w-24 bg-gray-200 rounded-md"></div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="h-4 w-full bg-gray-200 rounded-md"></div>
                <div className="h-4 w-full bg-gray-200 rounded-md"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded-md"></div>
              </div>

              <div className="h-10 w-32 bg-gray-200 rounded-md mb-6"></div>

              <div className="h-6 w-48 bg-gray-100 rounded-md mb-6"></div>

              <div className="h-14 w-full bg-gray-200 rounded-lg mt-6"></div>

              <div className="mt-8 space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="size-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
                      <div className="h-3 w-full bg-gray-100 rounded-md"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
