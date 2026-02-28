import { useEffect } from "react";
import { supabase } from "../../../../shared/services/supabase";
import { UsersDetails } from "../../services/admin.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../../shared/utils/constants";

function useGetUsersDetails() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const searchQuery = searchParams.get("query") || "";

  const {
    isLoading,
    data: { data: usersDetails, count } = {},
    error,
  } = useQuery({
    queryKey: ["usersDetails", page, searchQuery],
    queryFn: () => UsersDetails({ page, searchQuery }),
  });

  if (count) {
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount)
      queryClient.prefetchQuery({
        queryKey: ["usersDetails", page + 1, searchQuery],
        queryFn: () => UsersDetails({ page: page + 1, searchQuery }),
      });

    if (page > 1)
      queryClient.prefetchQuery({
        queryKey: ["usersDetails", page - 1, searchQuery],
        queryFn: () => UsersDetails({ page: page - 1, searchQuery }),
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
          table: "users",
        },
        () => {
          queryClient.invalidateQueries({
            queryKey: ["usersDetails"],
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return { isLoading, error, usersDetails, count };
}

export default useGetUsersDetails;
