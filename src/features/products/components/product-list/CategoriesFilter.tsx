import useGetCategories from "../../../categories/hooks/useGetCategories";
import type { Category } from "../../../categories/types";
import { memo } from "react";

type CategoriesFilterType = {
  updateParams: (
    updates: Record<string, string | null>,
    replace?: boolean,
  ) => void;
  categorySelected: string;
  setCategorySelected?: React.Dispatch<React.SetStateAction<string>>;
};
function CategoriesFilter({
  updateParams,
  categorySelected,
}: CategoriesFilterType) {
  const { data: categoriesList, isLoading } = useGetCategories({
    paginate: false,
  });

  const handelCategorySelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categorySelected = e.target.value;

    updateParams({ category: categorySelected });
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="category" className="font-semibold text-sm">
        Category
      </label>
      <select
        value={categorySelected}
        onChange={handelCategorySelected}
        disabled={isLoading}
        id="category"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {isLoading ? (
          <option>Loading categories...</option>
        ) : (
          <>
            <option value="all">All Categories</option>
            {categoriesList?.map((category: Category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
}

export default memo(CategoriesFilter);
