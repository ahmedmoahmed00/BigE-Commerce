import Spinner from "../../../../shared/components/ui/Spinner";
import { formatCurrency } from "../../../../shared/utils/helpers";
import useOrderDetails from "../../hooks/useOrderDetails";
import Pagination from "../shared/Pagination";
import { Table } from "../shared/Tabel";

// const fakeOrders = [
//   {
//     order_id: "a1b2c3d4e5",
//     customer_name: "ahmed mohamed",
//     items_count: 3,
//     total_price: 150.5,
//     status: "delivered",
//     order_date: "2024-02-10T10:30:00Z",
//   },
//   {
//     order_id: "f6g7h8i9j0",
//     customer_name: "sara ali",
//     items_count: 1,
//     total_price: 45.0,
//     status: "pending",
//     order_date: "2024-02-12T14:20:00Z",
//   },
//   {
//     order_id: "k1l2m3n4o5",
//     customer_name: "omar hassan",
//     items_count: 5,
//     total_price: 890.99,
//     status: "shipped",
//     order_date: "2024-02-15T09:00:00Z",
//   },
//   {
//     order_id: "p6q7r8s9t0",
//     customer_name: "leila mahmoud",
//     items_count: 2,
//     total_price: 120.0,
//     status: "delivered",
//     order_date: "2024-02-18T18:45:00Z",
//   },
//   {
//     order_id: "u1v2w3x4y5",
//     customer_name: "yassin khaled",
//     items_count: 10,
//     total_price: 2500.0,
//     status: "processing",
//     order_date: "2024-02-20T11:15:00Z",
//   },
//   {
//     order_id: "z6a7b8c9d0",
//     customer_name: "mona zaki",
//     items_count: 4,
//     total_price: 320.75,
//     status: "cancelled",
//     order_date: "2024-02-21T16:30:00Z",
//   },
//   {
//     order_id: "e1f2g3h4i5",
//     customer_name: "nour el-din",
//     items_count: 6,
//     total_price: 540.2,
//     status: "shipped",
//     order_date: "2024-02-22T08:10:00Z",
//   },
//   {
//     order_id: "j6k7l8m9n0",
//     customer_name: "fatima zahra",
//     items_count: 2,
//     total_price: 95.0,
//     status: "pending",
//     order_date: "2024-02-23T12:00:00Z",
//   },
//   {
//     order_id: "o1p2q3r4s5",
//     customer_name: "mostafa bakr",
//     items_count: 8,
//     total_price: 1100.4,
//     status: "delivered",
//     order_date: "2024-02-23T15:50:00Z",
//   },
//   {
//     order_id: "t6u7v8w9x0",
//     customer_name: "hoda ibrahim",
//     items_count: 3,
//     total_price: 215.3,
//     status: "processing",
//     order_date: "2024-02-23T20:05:00Z",
//   },
// ];

function TabelAdminDashboard() {
  const { ordersDetails, isLoading } = useOrderDetails();

  const formattedDate = (order_date: string) => {
    return order_date ? new Date(order_date).toLocaleDateString("en-US") : "";
  };

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && ordersDetails && (
        <Table>
          <Table.Header>
            <Table.Heading>Order ID</Table.Heading>
            <Table.Heading>Customer</Table.Heading>
            <Table.Heading>Items</Table.Heading>
            <Table.Heading>Total</Table.Heading>
            <Table.Heading>Status</Table.Heading>
            <Table.Heading>Date</Table.Heading>
          </Table.Header>
          <Table.Body
            data={ordersDetails}
            render={(order, index) => (
              <tr key={index}>
                <td className="px-6 py-4 font-medium whitespace-nowrap">{`ORD-${order.order_id.slice(0, 5)}`}</td>
                <td className="px-6 capitalize py-4 whitespace-nowrap">
                  {order.customer_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.items_count}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {formatCurrency(order.total_price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 rounded-full text-xs capitalize bg-green-100 text-green-700">
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {formattedDate(order.order_date)}
                </td>
              </tr>
            )}
          />
          {ordersDetails && ordersDetails?.length !== 0 && (
            <Table.Footer>
              <Pagination count={ordersDetails[0].total_count} />
            </Table.Footer>
          )}
        </Table>
      )}
    </>
  );
}

export default TabelAdminDashboard;
