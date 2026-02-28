import ProductControls from "./ProductControls";
import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import useGetProductsPaginated from "../../hooks/useGetProductsPaginated";
import ReactPaginate from "react-paginate";
import { Link, useSearchParams } from "react-router-dom";
import { useWindowSize } from "../../../../shared/hooks/useWindowSize";

function ProductsSection() {
  const { width } = useWindowSize();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isGrid, setIsGrid] = useState<boolean | true>(true);

  const { isLoading, data: productsData } = useGetProductsPaginated();

  const currentPage = searchParams.get("page") || 1;

  const totalProducts =
    Array.isArray(productsData) && productsData.length > 0
      ? Number(productsData[0].total_count)
      : 0;

  const handlePageClick = (event: { selected: number }) => {
    const page = event.selected + 1;

    setSearchParams((prev) => {
      prev.set("page", page.toString());
      return prev;
    });
  };

  const pageCount = Math.ceil(totalProducts / 12);

  const isMobile = width < 640;

  return (
    <div>
      <header className="mb-6 p-4 bg-primary rounded-xl">
        <ProductControls
          totalProducts={totalProducts}
          isGrid={isGrid}
          setIsGrid={setIsGrid}
        />
      </header>
      <div>
        <div
          className={`${isGrid ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"} `}
        >
          {isLoading &&
            Array.from({ length: 10 }).map((_, index) => {
              return <ProductSkeleton isGrid={isGrid} key={index} />;
            })}

          {!isLoading &&
            productsData &&
            productsData.map((product) => {
              return (
                <ProductCard
                  isGrid={isGrid}
                  product={product}
                  key={product.id}
                />
              );
            })}
        </div>
        {!isLoading && productsData && productsData?.length === 0 && (
          <div className="bg-white rounded-xl p-8 lg:p-12 items-center w-full flex flex-col gap-3">
            <p className="text-center text-gray-500">
              No products found matching your criteria.
            </p>
            <Link
              className="px-3 py-2 rounded-xl w-fit  bg-secondary text-primary"
              to={"/products"}
            >
              ClearFilters
            </Link>
          </div>
        )}
      </div>
      {pageCount > 0 && (
        <footer className="relative z-30 py-10">
          <nav aria-label="Pagination Navigation">
            <ReactPaginate
              breakLabel="..."
              nextLabel={
                <span className="flex items-center">
                  <span className="hidden sm:inline mr-1">next</span>
                  <span className="text-xl">›</span>
                </span>
              }
              previousLabel={
                <span className="flex items-center">
                  <span className="text-xl">‹</span>
                  <span className="hidden sm:inline ml-1">previous</span>
                </span>
              }
              onPageChange={handlePageClick}
              pageRangeDisplayed={isMobile ? 1 : 3}
              marginPagesDisplayed={isMobile ? 1 : 2}
              pageCount={pageCount}
              forcePage={Number(currentPage) - 1}
              renderOnZeroPageCount={() => {}}
              containerClassName="flex items-center justify-center space-x-1 sm:space-x-2 mt-12 mb-8"
              pageLinkClassName="w-9 h-9 sm:w-10 sm:h-10 flex justify-center items-center rounded-lg border border-gray-100 text-sm sm:text-base text-gray-600 hover:bg-gray-50 transition-all cursor-pointer"
              activeLinkClassName="!bg-blue-600 !text-white !border-blue-600 shadow-md"
              previousLinkClassName="px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer flex items-center font-medium text-sm sm:text-base"
              nextLinkClassName="px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer flex items-center font-medium text-sm sm:text-base"
              disabledLinkClassName="opacity-30 cursor-not-allowed"
              breakLinkClassName="text-gray-400 px-1 sm:px-2"
            />
          </nav>
        </footer>
      )}
    </div>
  );
}

export default ProductsSection;
