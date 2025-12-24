import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import {
  FiFacebook,
  FiLinkedin,
  FiLock,
  FiMail,
  FiTwitter,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/global/Input";
import { useAuth } from "../hooks/useAuth";
import { useLoading } from "../hooks/useLoading";

const Login = () => {
  const { loginUser } = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    startLoading();
    try {
      // Implement login logic here
      await loginUser(data.email, data.password, data.rememberMe);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          type="email"
          id="email"
          placeholder="Enter your email"
          icon={<FiMail />}
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />

        <Input
          label="Password"
          type="password"
          id="password"
          placeholder="Enter your password"
          icon={<FiLock />}
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
          })}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              {...register("rememberMe")}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-sm text-gray-600 hover:underline hover:text-blue-900"
          >
            Forgot password?
          </Link>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary/90 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary uppercase hover:scale-101 transition-all"
          >
            Sign In
          </button>
        </div>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        {/* signup with social media */}
        <div className="mt-6 flex items-center justify-center gap-5">
          {/* Facebook */}
          <Link
            to="/auth/facebook"
            className="flex items-center justify-center rounded-lg bg-[#3b5998] text-white hover:bg-[#344e86] transition-colors w-10 h-10"
            aria-label="Login with Facebook"
          >
            <FiFacebook className="w-5 h-5" />
          </Link>

          {/* Twitter */}
          <Link
            to="/auth/twitter"
            className="flex items-center justify-center rounded-lg bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] transition-colors  w-10 h-10"
            aria-label="Login with Twitter"
          >
            <FiTwitter className="h-5 w-5" />
          </Link>

          {/* Google */}
          <Link
            to="/auth/google"
            className="flex items-center justify-center rounded-lg bg-[#DB4437] text-white hover:bg-[#c53929] transition-colors w-10 h-10"
            aria-label="Login with Google"
          >
            <FaGoogle className="h-5 w-5" />
          </Link>

          {/* LinkedIn */}
          <Link
            to="/auth/linkedin"
            className="aspect-square flex items-center justify-center rounded-lg bg-[#0077B5] text-white hover:bg-[#00669b] transition-colors  w-10 h-10"
            aria-label="Login with LinkedIn"
          >
            <FiLinkedin className="h-5 w-5" />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
