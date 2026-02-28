import { useEffect, useRef } from "react";

type Handler = () => void;

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  handler: Handler,
  listenCapturing = true,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
}
