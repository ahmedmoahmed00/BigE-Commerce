import useAuth from "../../features/auth/hooks/useAuthContext";
import useGetOrdersHistory from "../../features/checkout/hooks/useGetOrdersHistory";
import type { OrderType } from "../../features/checkout/types";

import OrderHistoryCard from "../../features/profile/components/OrderHistoryCard";
import OrderHistorySkeletonCard from "../../features/profile/components/OrderHistorySkeletonCard";

function OrderHistory() {
  const { user } = useAuth();

  const userID = user?.id;

  const { data: ordersHistory, isPending } = useGetOrdersHistory(userID || "");

  return (
    <div>
      <header className="mb-4">
        <h2 className="font-semibold">Order History</h2>
      </header>
      <main className="space-y-4">
        {isPending &&
          [1, 2].map((index) => {
            return <OrderHistorySkeletonCard key={index} />;
          })}

        {!isPending &&
          ordersHistory?.map((order: OrderType) => {
            return <OrderHistoryCard key={order.id} order={order} />;
          })}
      </main>
    </div>
  );
}

export default OrderHistory;
