import { formatCurrency } from "../../../shared/utils/helpers";
import type { CartItemProps } from "../../cart/types";

export default function ReceiptTemplate({ orderDetails, ordersItems }: any) {
  return (
    <div
      style={{
        width: "450px",
        background: "#fff",
        padding: "40px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          borderBottom: "2px solid #f1f5f9",
          paddingBottom: "20px",
        }}
      >
        <h2 style={{ margin: 0, color: "#0f172a" }}>Order Receipt</h2>
        <p style={{ color: "#64748b" }}># {orderDetails?.id}</p>
      </div>

      <div style={{ padding: "20px 0" }}>
        {ordersItems?.map((item: CartItemProps) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span>
              {item.name} x {item.quantityInCart}
            </span>
            <strong>${(item.price * item.quantityInCart).toFixed(2)}</strong>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "#f8fafc",
          padding: "15px",
          borderRadius: "12px",
          textAlign: "right",
        }}
      >
        <span style={{ color: "#64748b" }}>Total Paid: </span>
        <strong style={{ fontSize: "20px", color: "#2563eb" }}>
          ${formatCurrency(orderDetails?.total_price)}
        </strong>
      </div>
    </div>
  );
}
