import type { ReactNode } from "react";

function SubmitButton({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled: boolean;
}) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className="w-full bg-secondary cursor-pointer text-primary py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
    >
      {children}
    </button>
  );
}

export default SubmitButton;
