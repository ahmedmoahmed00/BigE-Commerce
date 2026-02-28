import { formatCurrency } from "../../../shared/utils/helpers";
import type { OrderItem } from "../../checkout/types";

function OrderHistoryCardItem({ order }: { order: OrderItem }) {
  const totalPriceOrder = order.price_at_purchase * order.quantity;

  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
        <img
          src={order.products?.image_url}
          alt={order.products?.product_name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-sm">{order.products.product_name}</h4>
        <p className="text-sm text-gray-600">
          Qty: {order.quantity} × {formatCurrency(order.price_at_purchase)}
        </p>
      </div>
      <span className="font-medium">{formatCurrency(totalPriceOrder)}</span>
    </div>
  );
}

export default OrderHistoryCardItem;
