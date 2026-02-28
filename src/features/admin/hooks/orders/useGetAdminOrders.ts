import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminOrders } from "../../services/admin.api";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../../shared/utils/constants";
import { supabase } from "../../../../shared/services/supabase";
import { useEffect } from "react";

function useGetAdminOrders() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const searchQuery = searchParams.get("query") || "";

  const statusName = searchParams.get("status") || "all";

  const {
    isLoading,
    data: { data: ordersDetails, count } = {},
    error,
  } = useQuery({
    queryKey: ["ordersDetailsDashboard", page, searchQuery, statusName],
    queryFn: () => getAdminOrders({ page, searchQuery, statusName }),
  });

  if (count) {
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount)
      queryClient.prefetchQuery({
        queryKey: ["ordersDetailsDashboard", page + 1, searchQuery, statusName],
        queryFn: () =>
          getAdminOrders({ page: page + 1, searchQuery, statusName }),
      });

    if (page > 1)
      queryClient.prefetchQuery({
        queryKey: ["ordersDetailsDashboard", page - 1, searchQuery, statusName],
        queryFn: () =>
          getAdminOrders({ page: page - 1, searchQuery, statusName }),
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
          table: "orders",
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["ordersDetailsDashboard"],
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return { isLoading, error, ordersDetails, count };
}

export default useGetAdminOrders;
