import { useSearchParams } from "react-router-dom";
import useGetOrderStatus from "../../hooks/orders/useGetOrderStatus";
import type { OrderStatus } from "../../types";

function FilterStatus() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useGetOrderStatus();
  const status = searchParams.get("status") || "all";

  const handleSearchParams = (value: string) => {
    const status = value.toLowerCase();

    searchParams.delete("page");

    if (status === "all" || !value) {
      searchParams.delete("status");
    } else {
      searchParams.set("status", status);
    }

    setSearchParams(searchParams);
  };

  return (
    <select
      onChange={(e) => handleSearchParams(e.target.value)}
      value={status}
      className=" px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
    >
      {isLoading ? (
        <option>Loading statuses...</option>
      ) : (
        <>
          <option value={"all"}>All</option>
          {data?.map((item: OrderStatus) => {
            return (
              <option key={item.id} value={item.name}>
                {item.display_name}
              </option>
            );
          })}
        </>
      )}
    </select>
  );
}

export default FilterStatus;
