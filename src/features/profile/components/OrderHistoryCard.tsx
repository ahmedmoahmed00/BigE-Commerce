import { FiMapPin } from "react-icons/fi";
import type { OrderItem, OrderType } from "../../checkout/types";
import OrderHistoryCardItem from "./OrderHistoryCardItem";
import { formatCurrency } from "../../../shared/utils/helpers";

function OrderHistoryCard({ order }: { order: OrderType }) {
  const formattedDate = order?.created_at
    ? new Date(order.created_at).toLocaleDateString()
    : "";

  return (
    <div className="bg-primary rounded-2xl p-6 shadow-sm">
      <header className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-medium mb-1">Order ORD-{order.id.slice(0, 4)}</h3>
          <p className="text-sm text-gray-600">Placed on {formattedDate}</p>
        </div>
        <span
          style={{ background: order.order_statuses.color }}
          className="px-3 py-1 rounded-full text-sm capitalize "
        >
          {order.order_statuses.display_name}
        </span>
      </header>
      <main className="space-y-3 mb-4">
        {order.items?.map((orderItem: OrderItem) => {
          return <OrderHistoryCardItem key={orderItem.id} order={orderItem} />;
        })}
      </main>
      <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          <FiMapPin className="size-4 inline mr-1" />
          {order.address}
        </div>
        <div className="font-semibold">
          Total: {formatCurrency(order.total_price)}
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryCard;
