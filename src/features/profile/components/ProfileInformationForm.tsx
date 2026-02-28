import { useState } from "react";
import useAuth from "../../auth/hooks/useAuthContext";
import Input from "../../auth/components/Input";
import InputAddress from "../../../shared/components/ui/InputAddress";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { LuPackage } from "react-icons/lu";
import SubmitButton from "../../../shared/components/ui/SubmitButton";
import useUpdateUser from "../hooks/useUpdateUser";
import ShowMessageError from "../../../shared/components/ui/ShowMessageError";

function ProfileInformationForm() {
  const { user } = useAuth();
  const { mutate: updateUser, isPending } = useUpdateUser();

  const formattedDate = user?.created_at
    ? new Date(user.created_at).toISOString().split("T")[0]
    : "";

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
    date: formattedDate || "",
  });

  const [messageError, setMessageError] = useState<string>("");

  const { fullName, address, date, email } = formData;

  if (!user) {
    return null;
  }

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      fullName !== user?.name ||
      email !== user?.email ||
      date !== formattedDate
    ) {
      return;
    }

    if (address === user.address || address.length < 10) {
      setMessageError(
        "Please enter a new and valid address (at least 10 characters).",
      );
      return;
    }

    setMessageError("");
    updateUser({ userID: user.id, address: address });
  };

  return (
    <form onSubmit={handelSubmit} className="flex flex-col gap-6">
      <div>
        {messageError && <ShowMessageError messageError={messageError} />}
      </div>
      <Input
        icon={FaRegUser}
        label="Full Name"
        placeholder="John Doe"
        value={formData.fullName}
        setValue={() => setFormData({ ...formData })}
      />
      <Input
        value={formData.email}
        label="Email Address"
        placeholder="you@example.com"
        type="email"
        icon={MdOutlineMail}
        setValue={() => setFormData({ ...formData })}
      />
      <Input
        value={formData.date}
        label="Member Since"
        placeholder="mm/yy/dd"
        type="date"
        icon={LuPackage}
        setValue={() => setFormData({ ...formData })}
      />
      <InputAddress
        showIcon={true}
        label="Shipping Address"
        placeholder="123 Main Street"
        value={formData.address}
        setValue={(val) => setFormData({ ...formData, address: val })}
      />

      <div className="w-40">
        <SubmitButton disabled={isPending}>Update Address</SubmitButton>
      </div>
    </form>
  );
}

export default ProfileInformationForm;
