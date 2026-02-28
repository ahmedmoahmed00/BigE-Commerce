import { useEffect, useMemo } from "react";
import confetti from "canvas-confetti";
import { IoCheckmarkCircle } from "react-icons/io5";
import { HiHome, HiDownload } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import type { CartItemProps } from "../features/cart/types";
import useAuth from "../features/auth/hooks/useAuthContext";
import useSendOrderEmail from "../features/checkout/hooks/useSendOrderEmail";
import { useDownloadReceipt } from "../features/checkout/hooks/useDownloadReceipt";
import ReceiptTemplate from "../features/checkout/components/ReceiptTemplate";
import { formatCurrency } from "../shared/utils/helpers";

const SuccessPage = () => {
  const { receiptRef, downloadReceipt } = useDownloadReceipt();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { fromCheckout, orderDetails, ordersItems } = location.state || {};

  const { mutate: sendEmail } = useSendOrderEmail();

  const ordersList = useMemo(() => {
    return (
      ordersItems?.map((item: CartItemProps) => ({
        name: item.name,
        units: item.quantityInCart,
        price: (item.price * item.quantityInCart).toFixed(2),
        image_url: item.image_url,
      })) || []
    );
  }, [ordersItems]);

  useEffect(() => {
    if (!fromCheckout) {
      navigate("/", { replace: true });
      return;
    }

    const end = Date.now() + 3 * 1000;
    const colors = ["#22c55e", "#3b82f6", "#a855f7"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, [fromCheckout, navigate]);

  useEffect(() => {
    const emailSentFlag = sessionStorage.getItem(
      `sent_email_${orderDetails?.id}`,
    );

    if (
      fromCheckout &&
      user &&
      orderDetails &&
      ordersList.length > 0 &&
      !emailSentFlag
    ) {
      sendEmail({
        templateParams: {
          order_id: orderDetails.id || "N/A",
          customer_name: user?.name || "Customer",
          email: user?.email,
          cost_subtotal: orderDetails.total_price.toFixed(2),
          cost_total: orderDetails.total_price.toFixed(2),
          orders: ordersList,
        },
      });

      sessionStorage.setItem(`sent_email_${orderDetails?.id}`, "true");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!fromCheckout) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans">
      <div className="relative max-w-lg w-full bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 text-center overflow-hidden border border-slate-50">
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-green-400 via-blue-500 to-purple-500"></div>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-green-200 rounded-full blur-2xl opacity-40 animate-pulse"></div>
            <IoCheckmarkCircle className="relative w-24 h-24 text-green-500 drop-shadow-xl" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">
          Payment Successful!
        </h1>
        <p className="text-slate-500 text-lg mb-10 leading-relaxed">
          Your transaction has been completed. <br />A confirmation email is on
          its way to you.
        </p>

        <div className="bg-slate-50 rounded-3xl p-6 mb-10 border border-slate-100">
          <div className="flex flex-col sm:flex-row gap-2 justify-between items-center mb-4">
            <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">
              Ref Number
            </span>
            <span className="text-slate-700 font-mono font-bold bg-white px-3 py-1 rounded-lg border border-slate-200">
              #{orderDetails?.id?.slice(0, 8).toUpperCase() || "N/A"}
            </span>
          </div>
          <div className="h-px bg-slate-200 w-full mb-4"></div>
          <div className="flex justify-between flex-col sm:flex-row gap-2 items-center">
            <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">
              Amount Paid
            </span>
            <span className="text-2xl font-black text-blue-600">
              {formatCurrency(orderDetails?.total_price)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center cursor-pointer gap-2 bg-slate-900 hover:bg-black text-white font-bold py-4 px-6 rounded-2xl transition-all active:scale-95 shadow-xl"
          >
            <HiHome className="text-xl" /> Home
          </button>
          <button
            onClick={() => downloadReceipt(orderDetails?.id)}
            className="flex items-center justify-center cursor-pointer gap-2 bg-white hover:bg-slate-50 text-slate-700 font-bold py-4 px-6 rounded-2xl border-2 border-slate-100 transition-all active:scale-95"
          >
            <HiDownload className="text-xl text-blue-500" /> Receipt
          </button>
        </div>
      </div>

      <div style={{ position: "absolute", top: "-2000vh", left: "-2000vw" }}>
        <div ref={receiptRef}>
          <ReceiptTemplate
            orderDetails={orderDetails}
            ordersItems={ordersItems}
          />
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
