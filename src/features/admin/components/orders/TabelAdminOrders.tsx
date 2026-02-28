import { IoEyeOutline } from "react-icons/io5";
import { PAGE_SIZE } from "../../../../shared/utils/constants";
import useGetAdminOrders from "../../hooks/orders/useGetAdminOrders";
import Pagination from "../shared/Pagination";
import { Table } from "../shared/Tabel";
import { formatCurrency } from "../../../../shared/utils/helpers";
import useGetOrderStatus from "../../hooks/orders/useGetOrderStatus";
import type { OrderStatus } from "../../types";
import Spinner from "../../../../shared/components/ui/Spinner";
import { useState } from "react";
import useUpdateOrderStatus from "../../hooks/orders/useUpdateOrderStatus";
import OrderDetailsModal from "./OrderDetailsModal";

function TabelAdminOrders() {
  const [pendingStatusUpdates, setPendingStatusUpdates] = useState<
    Record<string, string>
  >({});

  const {
    isLoading: isLoadingOrders,
    ordersDetails,
    count,
  } = useGetAdminOrders();
  const { data: orderStatus, isLoading: isLoadingStatus } = useGetOrderStatus();
  const { mutate: updateOrderStatus, isPending } = useUpdateOrderStatus();
  const [orderIdToView, setOrderIdToView] = useState<string | null>(null);

  const isModalOpen = !!orderIdToView;

  const onClose = () => {
    setOrderIdToView(null);
  };

  const handleStatusChange = (
    orderId: string,
    newStatusId: string,
    originalStatusId: string,
  ) => {
    setPendingStatusUpdates((prev) => {
      if (newStatusId === originalStatusId) {
        const newState = { ...prev };
        delete newState[orderId];
        return newState;
      }
      return { ...prev, [orderId]: newStatusId };
    });
  };

  const handleUpdateStatus = () => {
    const updates = Object.entries(pendingStatusUpdates).map(
      ([id, status_id]) => ({
        id,
        status_id,
      }),
    );

    updateOrderStatus(updates, {
      onSuccess: () => {
        setPendingStatusUpdates({});
      },
    });
  };

  return (
    <>
      {isLoadingOrders && (
        <div className="flex justify-center p-10">
          <Spinner />
        </div>
      )}

      {!isLoadingOrders && ordersDetails && (
        <Table>
          <Table.Header>
            <Table.Heading>
              <div className="w-25">Order ID</div>
            </Table.Heading>
            <Table.Heading>Customer</Table.Heading>
            <Table.Heading>
              <div className="w-20">Items</div>
            </Table.Heading>
            <Table.Heading>Total</Table.Heading>
            <Table.Heading>Status</Table.Heading>
            <Table.Heading>Actions</Table.Heading>
          </Table.Header>

          <Table.Body
            data={ordersDetails}
            render={(order) => {
              const isModified = !!pendingStatusUpdates[order.id];

              const currentStatusId =
                pendingStatusUpdates[order.id] || order.status_id;

              const currentStatusData = orderStatus?.find(
                (s) => s.id === currentStatusId,
              );

              return (
                <tr
                  key={order.id}
                  className={isModified ? "bg-orange-50/50" : ""}
                >
                  <td className="px-6 py-4 font-medium w-25">{`ORD-${order.id.slice(0, 5)}`}</td>

                  <td className="px-6 py-4">
                    <div className="font-medium">{order.users.name}</div>
                    <div className="text-sm text-gray-500">
                      {order.users.email}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {order.order_items?.[0]?.count || 0} items
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    {formatCurrency(order.total_price)}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <select
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value,
                            order.status_id,
                          )
                        }
                        value={currentStatusId}
                        style={{
                          backgroundColor:
                            currentStatusData?.color ||
                            order.order_statuses.color,
                          color: "white",
                        }}
                        className="px-2 py-1 rounded-full text-sm border-0 w-fit focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      >
                        {isLoadingStatus ? (
                          <option>Loading...</option>
                        ) : (
                          orderStatus?.map((item: OrderStatus) => (
                            <option
                              key={item.id}
                              value={item.id}
                              className="bg-white text-black"
                            >
                              {item.display_name}
                            </option>
                          ))
                        )}
                      </select>

                      {isModified && (
                        <span className="text-[10px] font-extrabold text-orange-600 px-2 uppercase">
                          Modified
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => setOrderIdToView(order.id)}
                      className="p-2 cursor-pointer text-secondary hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <IoEyeOutline className="size-4" />
                    </button>
                  </td>
                </tr>
              );
            }}
          />

          {!!count && count > PAGE_SIZE && (
            <Table.Footer>
              <Pagination count={count} />
            </Table.Footer>
          )}
        </Table>
      )}

      {Object.keys(pendingStatusUpdates).length > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            disabled={isPending}
            onClick={handleUpdateStatus}
            className={`bg-secondary text-white px-8 py-3 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2 ${isPending ? "opacity-70 cursor-not-allowed" : "animate-bounce"}`}
          >
            {isPending
              ? "Loading..."
              : `Save ${Object.keys(pendingStatusUpdates).length} Changes`}
          </button>
        </div>
      )}

      {isModalOpen && orderIdToView && (
        <OrderDetailsModal onClose={onClose} orderId={orderIdToView} />
      )}
    </>
  );
}

export default TabelAdminOrders;
