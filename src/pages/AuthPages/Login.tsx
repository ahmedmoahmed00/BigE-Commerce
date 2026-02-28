import { useState } from "react";
import Input from "../../features/auth/components/Input";
import ShowMessageError from "../../shared/components/ui/ShowMessageError";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { EMAIL_REGEX } from "../../shared/config/validation";
import { Link } from "react-router-dom";
import useLogin from "../../features/auth/hooks/useLogin";
import LoginWithGoogle from "../../features/auth/components/LoginWithGoogle";
import SubmitButton from "../../shared/components/ui/SubmitButton";
function Login() {
  const { mutate: login, isPending } = useLogin();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [messageError, setMessageError] = useState<string>("");

  const handleCreateAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!EMAIL_REGEX.test(email)) {
      setMessageError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setMessageError("Password must be at least 6 characters long.");
      return;
    }

    setMessageError("");
    login({ email, password });
  };

  return (
    <div className="bg-primary rounded-2xl shadow-sm border border-gray-200 p-8 max-w-112.5 w-full mx-4">
      <header className="text-center mb-8">
        <h1 className="font-semibold text-2xl mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to your account</p>
      </header>
      {messageError && <ShowMessageError messageError={messageError} />}

      <main>
        <form onSubmit={handleCreateAccount} className="flex flex-col gap-5">
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
            placeholder="Enter your password"
            setValue={(val) => setFormData({ ...formData, password: val })}
            type="password"
            icon={IoLockClosedOutline}
          />
          <div>
            <SubmitButton disabled={isPending}>
              {isPending ? (
                <div className="flex items-center justify-center">
                  <span className="loader size-6 bg-white"></span>
                </div>
              ) : (
                "Login"
              )}
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
              to="/signup"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;
