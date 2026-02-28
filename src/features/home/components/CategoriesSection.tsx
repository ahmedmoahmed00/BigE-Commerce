import CategoryBox from "../../../features/categories/componetns/CategoryBox";
import useInView from "../../../shared/hooks/useInView";
import useGetCategories from "../../categories/hooks/useGetCategories";
import type { Category } from "../../categories/types";
import SkeletonCategoryBox from "../../categories/componetns/SkeletonCategoryBox";

function CategoriesSection() {
  const { ref, visible } = useInView();
  const { data: categories, isLoading } = useGetCategories({
    paginate: true,
    start: 0,
    end: 4,
  });

  return (
    <div ref={ref}>
      <div className="text-center mb-12">
        <h2
          className={`${visible ? "translate-y-0 opacity-100" : " translate-y-5 opacity-0"} transition-all duration-600 text-xl font-semibold mb-3`}
        >
          Shop by Category
        </h2>
        <p
          className={`${visible ? "translate-y-0 opacity-100" : " translate-y-5 opacity-0"} transition-all duration-800 text-gray-600`}
        >
          Browse our wide range of product categories
        </p>
      </div>
      <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCategoryBox key={index} />
          ))}

        {categories?.map((category: Category, index: number) => (
          <CategoryBox
            category={category}
            delay={index === 0 ? 0 : index * 100}
            key={index}
          >
            <h3 className="break-all">{category.name}</h3>
          </CategoryBox>
        ))}
      </div>
    </div>
  );
}

export default CategoriesSection;
