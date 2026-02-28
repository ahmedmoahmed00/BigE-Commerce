import type { Category, GetCategoriesParams } from "../types";
import { getCategories } from "../api/getCategories";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_SIZE = 12;

function useGetInfiniteCategories({ paginate }: GetCategoriesParams) {
  const query = useInfiniteQuery({
    queryKey: ["categories", { paginate }],
    queryFn: ({ pageParam }) =>
      getCategories({
        paginate,
        start: pageParam,
        end: pageParam + PAGE_SIZE - 1,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;

      return pages.length * PAGE_SIZE;
    },  
  });

  const data: Category[] = query.data?.pages.flatMap((page) => page) ?? [];

  return { ...query, data };
}

export default useGetInfiniteCategories;
