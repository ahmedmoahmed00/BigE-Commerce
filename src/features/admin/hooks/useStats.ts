import { useQuery } from "@tanstack/react-query";
import { getStats } from "../services/admin.api";

function useStats() {
  const query = useQuery({
    queryKey: ["stats"],
    queryFn: () => getStats(),
  });

  return query;
}

export default useStats;
