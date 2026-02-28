import { useEffect, type ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useOutsideClick } from "../../hooks/useOutsideClick";

function Modal({
  title,
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
  title: string;
}) {
  const ref = useOutsideClick<HTMLDivElement>(onClose);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div>
      <div className="fixed z-50  inset-0 bg-black/40 "></div>
      <div
        ref={ref}
        className="flex border border-primary shadow-lg flex-col z-100 gap-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary p-4 w-[95%] max-w-2xl rounded-lg"
      >
        <header className="flex items-center justify-between border-b border-b-primary  pb-4">
          <h1 className="font-semibold  text-lg lg:text-xl">{title}</h1>
          <button
            aria-label="close Model"
            onClick={onClose}
            className=" w-fit ml-auto cursor-pointer "
          >
            <IoCloseOutline className="size-5 font" />
          </button>
        </header>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
