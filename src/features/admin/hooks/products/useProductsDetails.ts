import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { PAGE_SIZE } from "../../../../shared/utils/constants";
import { getProductsDetails } from "../../services/admin.api";
import { supabase } from "../../../../shared/services/supabase";

function useProductsDetails() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const searchQuery = searchParams.get("query") || "";

  const {
    isLoading,
    data: { data: productsDetails, count } = {},
    error,
  } = useQuery({
    queryKey: ["productsDetailDashboard", page, searchQuery],
    queryFn: () => getProductsDetails({ page, searchQuery }),
  });

  if (count) {
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount)
      queryClient.prefetchQuery({
        queryKey: ["productsDetailDashboard", page + 1, searchQuery],
        queryFn: () => getProductsDetails({ page: page + 1, searchQuery }),
      });

    if (page > 1)
      queryClient.prefetchQuery({
        queryKey: ["productsDetailDashboard", page - 1, searchQuery],
        queryFn: () => getProductsDetails({ page: page - 1, searchQuery }),
      });
  }

  useEffect(() => {
    const channel = supabase
      .channel("products-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "products",
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["productsDetailDashboard"],
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return { isLoading, error, productsDetails, count };
}

export default useProductsDetails;
