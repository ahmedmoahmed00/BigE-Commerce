import { IoMdGrid } from "react-icons/io";
import { IoList } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";

interface SetGridProps {
  totalProducts: number;
  isGrid: boolean;
  setIsGrid: React.Dispatch<React.SetStateAction<boolean | true>>;
}

function ProductControls({ totalProducts, isGrid, setIsGrid }: SetGridProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortValue = searchParams.get("sort") || "created_at-desc";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sort", e.target.value);

    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col lg:items-center lg:flex-row justify-between">
      <div className="text-gray-600 mb-2 lg:mb-0">
        Showing {totalProducts} products
      </div>
      <div className="flex items-center gap-4">
        <select
          className="px-3 py-2 border rounded-lg focus:outline-none border-gray-300 focus:ring-2 focus:ring-blue-500"
          aria-label="Sort"
          value={sortValue}
          onChange={handleSortChange}
        >
          <option value="created_at-desc">Newest First</option>
          <option value="created_at-asc">Oldest First</option>
          <option value="name-asc">Name: A → Z</option>
          <option value="name-desc">Name: Z → A</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
        <button
          onClick={() => setIsGrid(true)}
          className={`${isGrid && "p-2 rounded-lg bg-blue-100 text-blue-600"} text-xl cursor-pointer`}
          aria-label="Grid products"
        >
          <IoMdGrid />
        </button>
        <button
          onClick={() => setIsGrid(false)}
          className={`${!isGrid && "p-2 rounded-lg bg-blue-100 text-blue-600"} text-xl cursor-pointer`}
          aria-label="List Products"
        >
          <IoList />
        </button>
      </div>
    </div>
  );
}

export default ProductControls;
