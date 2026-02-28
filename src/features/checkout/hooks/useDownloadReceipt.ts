import { useRef } from "react";
import * as htmlToImage from "html-to-image";

export const useDownloadReceipt = () => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const downloadReceipt = async (orderId: string = "order") => {
    if (receiptRef.current === null) return;

    try {
      const dataUrl = await htmlToImage.toPng(receiptRef.current, {
        cacheBust: true,
        backgroundColor: "#f4f7f9",
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `receipt-${orderId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate receipt image:", err);
    }
  };

  return { receiptRef, downloadReceipt };
};
