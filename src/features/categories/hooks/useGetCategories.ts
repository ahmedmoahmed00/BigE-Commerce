import { useQuery } from "@tanstack/react-query";
import type { GetCategoriesParams } from "../types";
import { getCategories } from "../api/getCategories";

function useGetCategories({ paginate, start, end }: GetCategoriesParams) {
  const query = useQuery({
    queryKey: ["categories", paginate, start, end],
    queryFn: () => getCategories({ paginate, start, end }),
  });

  return query;
}

export default useGetCategories;
