import Loader from "../../../../shared/components/ui/Loader";
import Modal from "../../../../shared/components/ui/Modal";
import { formatCurrency } from "../../../../shared/utils/helpers";
import useGetOrderDetails from "../../hooks/orders/useGetOrderDetails";

function OrderDetailsModal({
  onClose,
  orderId,
}: {
  onClose: () => void;
  orderId: string;
}) {
  const { data, isLoading } = useGetOrderDetails(orderId);

  const order = data?.[0];

  if (isLoading || !order) {
    return <Loader />;
  }

  const formattedDate = order?.created_at
    ? new Date(order.created_at).toLocaleString()
    : "";

  return (
    <Modal title={`ORD-${order.id.slice(0, 5)}`} onClose={() => onClose()}>
      <div className="mb-6">
        <h2 className="font-medium mb-3 text-lg">Customer Information</h2>
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <p>
            <span className="text-gray-600">Name: </span>
            <span className="font-medium">{order.users.name}</span>
          </p>
          <p>
            <span className="text-gray-600">Email: </span>
            <span className="font-medium">{order.users.email}</span>
          </p>
          <p>
            <span className="text-gray-600">Shipping Address: </span>
            <span className="font-medium">{order.address}</span>
          </p>
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-3">Order Items</h3>
        <div className="space-y-4">
          {order.order_items.map((order) => {
            return (
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={order.products?.image_url}
                    alt={order.products?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{order.products.name}</h4>
                  <p className="text-sm text-gray-600">
                    Qty: {order.quantity} × {formatCurrency(order.price)}
                  </p>
                </div>
                <span className="font-medium">
                  {formatCurrency(order.price * order.quantity)}
                </span>
              </div>
            );
          })}
        </div>
        <div>
          <h3 className="font-medium mb-3 mt-6">Order Summary</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 ">
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span
                style={{ background: order.order_statuses.color }}
                className="px-3 py-1 text-white rounded-full text-sm capitalize "
              >
                {order.order_statuses.display_name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-medium">{formattedDate}</span>
            </div>
            <div className="border-t border-t-gray-300  pt-2 flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>{formatCurrency(order.total_price)}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default OrderDetailsModal;
