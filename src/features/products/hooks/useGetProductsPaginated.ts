import { useQuery } from "@tanstack/react-query";
import { getProductsPaginated } from "../services/products.api";
import { useSearchParams } from "react-router-dom";
import useGetCategories from "../../categories/hooks/useGetCategories";

const PAGE_LIMIT = 12;

function useGetProductsPaginated() {
  const { data: categories } = useGetCategories({
    paginate: false,
  });

  const [searchParams] = useSearchParams();

  const params = Object.fromEntries(searchParams.entries());
  const {
    search: searchParam,
    price_lte: price_ltParam,
    category: categorySlugParam,
    sort: sortByRaw,
    page: pageParam,
  } = params;

  const categoryUUID = categories?.find(
    (c) => c.slug === categorySlugParam,
  )?.id;

  const [field = "created_at", direction = "desc"] = (
    sortByRaw || "created_at-desc"
  ).split("-");

  const sortBy = { field, direction };

  const offset = (Number(pageParam) - 1) * PAGE_LIMIT;

  const query = useQuery({
    queryKey: [
      "products",
      pageParam,
      categoryUUID,
      searchParam,
      price_ltParam,
      field,
      direction,
    ],
    queryFn: () =>
      getProductsPaginated({
        limit: PAGE_LIMIT,
        page: offset,
        category: categoryUUID?.toString() || null,
        search: searchParam?.trim() || null,
        maxPrice: price_ltParam ? Number(price_ltParam) : null,
        sortBy: sortBy.field as "price" | "created_at" | "name",
        sortOrder: sortBy.direction as "asc" | "desc",
      }),
    enabled: !!categories || !categorySlugParam,
  });

  return query;
}

export default useGetProductsPaginated;
