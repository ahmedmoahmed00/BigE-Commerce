import { useState } from "react";
import Input from "../../features/auth/components/Input";
import { MdOutlineMail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { Link } from "react-router-dom";
import { EMAIL_REGEX } from "../../shared/config/validation";
import useSignUpWithEmail from "../../features/auth/hooks/useSignUpWithEmail";
import LoginWithGoogle from "../../features/auth/components/LoginWithGoogle";
import ShowMessageError from "../../shared/components/ui/ShowMessageError";
import SubmitButton from "../../shared/components/ui/SubmitButton";

function Signup() {
  const { mutate: emailSignup, isPending: isEmailLoading } =
    useSignUpWithEmail();
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  const [messageError, setMessageError] = useState<string>("");

  const handleCreateAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { fullName, email, password, confirmPassword } = formData;

    if (fullName.length < 10) {
      setMessageError("Please enter your full name (at least 10 characters).");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setMessageError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setMessageError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setMessageError("Passwords do not match.");
      return;
    }

    setMessageError("");
    emailSignup({ fullName, email, password });
  };

  return (
    <div className="bg-primary rounded-2xl shadow-sm border border-gray-200 p-8 max-w-112.5 w-full mx-4">
      <header className="text-center mb-8">
        <h1 className="font-semibold mb-2 text-2xl ">Create Account</h1>
        <p className="text-gray-600">Sign up to get started</p>
      </header>

      {messageError && <ShowMessageError messageError={messageError} />}

      <main>
        <form onSubmit={handleCreateAccount} className="flex flex-col gap-5">
          <Input
            value={formData.fullName}
            label="Full Name"
            placeholder="John Doe"
            setValue={(val) => setFormData({ ...formData, fullName: val })}
            type="text"
            icon={LuUser}
          />
          <Input
            value={formData.email}
            label="Email Address"
            placeholder="you@example.com"
            setValue={(val) => setFormData({ ...formData, email: val })}
            type="email"
            icon={MdOutlineMail}
          />
          <Input
            value={formData.password}
            label="Password"
            placeholder="At least 6 characters"
            setValue={(val) => setFormData({ ...formData, password: val })}
            type="password"
            icon={IoLockClosedOutline}
          />
          <Input
            value={formData.confirmPassword}
            label="Confirm Password"
            placeholder="Confirm your password"
            setValue={(val) =>
              setFormData({ ...formData, confirmPassword: val })
            }
            type="password"
            icon={IoLockClosedOutline}
          />
          <div>
            <SubmitButton disabled={isEmailLoading}>
              Create Account
            </SubmitButton>
          </div>
        </form>

        <div>
          <LoginWithGoogle />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?
            <Link
              className="text-secondary hover:text-blue-700 font-medium"
              to="/login"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Signup;
