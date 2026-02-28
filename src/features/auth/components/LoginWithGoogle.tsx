import { FcGoogle } from "react-icons/fc";
import useSignInWithGoogle from "../hooks/useSignInWithGoogle";

function LoginWithGoogle() {
  const { mutate: googleLogin, isPending: isGoogleLoading } =
    useSignInWithGoogle();
  return (
    <>
      <div className="mt-6 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <button
        onClick={() => googleLogin()}
        type="button"
        disabled={isGoogleLoading}
        className="mt-6 w-full flex items-center cursor-pointer justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg bg-primary text-gray-700 transition-all duration-100 ease-in-out hover:scale-101 hover:bg-gray-50 hover:shadow-md active:scale-95"
      >
        <FcGoogle className="text-xl" />
        <span className="font-medium">Sign up with Google</span>
      </button>
    </>
  );
}

export default LoginWithGoogle;
