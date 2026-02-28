import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../../shared/utils/constants";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

function Pagination({ count }: { count: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next.toString());
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev.toString());
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-between w-full">
      <p>
        Showing{" "}
        <span className="font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span className="font-semibold">{count}</span> results
      </p>
      <div className="flex items-center gap-1.5">
        <button
          className="flex items-center gap-2 py-1.5 disabled:cursor-not-allowed disabled:bg-primary disabled:text-accent px-3 cursor-pointer transition-colors duration-300 hover:bg-secondary hover:text-primary rounded-[5px] text-sm font-semibold"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <HiChevronLeft className="size-4.5" /> <span>Previous</span>
        </button>
        <button
          className="flex items-center gap-2 py-1.5 disabled:cursor-not-allowed disabled:bg-primary disabled:text-accent px-3 cursor-pointer transition-colors duration-300 hover:bg-secondary hover:text-primary rounded-[5px] text-sm font-semibold"
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Next</span> <HiChevronRight className="size-4.5" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
