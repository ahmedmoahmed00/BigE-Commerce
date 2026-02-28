import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrderDetails } from "../services/admin.api";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../shared/utils/constants";

function useOrderDetails() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const {
    isLoading,
    data: ordersDetails,
    error,
  } = useQuery({
    queryKey: ["ordersDetailDashboard", page],
    queryFn: () => getOrderDetails({ page }),
  });

  const totalCount = ordersDetails?.[0]?.total_count ?? 0;

  const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["ordersDetailDashboard", page + 1],
      queryFn: () => getOrderDetails({ page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["ordersDetailDashboard", page - 1],
      queryFn: () => getOrderDetails({ page: page - 1 }),
    });

  return { isLoading, ordersDetails, error };
}

export default useOrderDetails;
