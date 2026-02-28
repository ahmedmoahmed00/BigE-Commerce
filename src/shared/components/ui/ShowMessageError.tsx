import { LuCircleAlert } from "react-icons/lu";

function ShowMessageError({ messageError }: { messageError: string }) {
  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
      <LuCircleAlert className="size-6" />
      <p className="text-sm">{messageError}</p>
    </div>
  );
}

export default ShowMessageError;
