import { useEffect } from "react";
import { supabase } from "../../../../shared/services/supabase";
import { getCategoriesDetails } from "../../services/admin.api";
import { PAGE_SIZE } from "../../../../shared/utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

function useCategoriesDetails() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const searchQuery = searchParams.get("query") || "";

  const {
    isLoading,
    data: { data: categoriesDetails, count } = {},
    error,
  } = useQuery({
    queryKey: ["categoriesDetailDashboard", page, searchQuery],
    queryFn: () => getCategoriesDetails({ page, searchQuery }),
  });

  if (count) {
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount)
      queryClient.prefetchQuery({
        queryKey: ["categoriesDetailDashboard", page + 1, searchQuery],
        queryFn: () => getCategoriesDetails({ page: page + 1, searchQuery }),
      });

    if (page > 1)
      queryClient.prefetchQuery({
        queryKey: ["categoriesDetailDashboard", page - 1, searchQuery],
        queryFn: () => getCategoriesDetails({ page: page - 1, searchQuery }),
      });
  }

  useEffect(() => {
    const channel = supabase
      .channel("categories-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "categories",
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["categoriesDetailDashboard"],
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return { isLoading, error, categoriesDetails, count };
}

export default useCategoriesDetails;
