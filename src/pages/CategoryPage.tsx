import CategoryBox from "../features/categories/componetns/CategoryBox";
import SkeletonCategoryBox from "../features/categories/componetns/SkeletonCategoryBox";
import useGetInfiniteCategories from "../features/categories/hooks/useGetCategoriesInfinty";

function CategoryPage() {
  const {
    data: categories,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteCategories({
    paginate: true,
  });

  const handelFetchNext = () => {
    fetchNextPage();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">Shop by Category</h1>
        <h2 className="text-lg text-gray-600 mb-8 border-l-4 border-secondary pl-3">
          Explore our wide range of product collections
        </h2>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading &&
          Array.from({ length: 12 }).map((_, index) => {
            return <SkeletonCategoryBox key={index} />;
          })}
        {!isLoading &&
          categories &&
          categories?.map((category) => {
            return (
              <CategoryBox category={category} delay={0} key={category.id}>
                <p className="break-all font-medium text-center">
                  {category.name}
                </p>
              </CategoryBox>
            );
          })}
      </div>

      <div className="flex items-center justify-center mt-10">
        {hasNextPage ? (
          <button
            onClick={() => handelFetchNext()}
            disabled={isFetchingNextPage}
            className="py-3 px-8 cursor-pointer text-sm bg-secondary text-primary rounded-xl font-bold hover:opacity-90 transition-opacity disabled:bg-gray-300"
          >
            {isFetchingNextPage ? "Loading..." : "Load More Categories"}
          </button>
        ) : (
          <p className="text-lg text-gray-400 italic">
            No more categories available.
          </p>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
