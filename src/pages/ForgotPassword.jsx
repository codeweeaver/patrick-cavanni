import { FaGoogle } from "react-icons/fa";
import {
  FiArrowLeft,
  FiFacebook,
  FiLinkedin,
  FiMail,
  FiTwitter,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="p-8 relative">
      <button
        className="absolute z-50 left-5 -top-5 w-10 h-10 rounded-full shadow-md flex items-center justify-center hover:text-primary hover:scale-105 transform transition-all"
        tooltip="go back to login"
        onClick={() => navigate(-1)}
      >
        <FiArrowLeft />
      </button>
      <div className="text-center my-8">
        <p className="text-gray-600 text-xl">
          Enter the email address or mobile number associated with your account.
        </p>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary/90 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary uppercase hover:scale-101 transition-all"
          >
            Send
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
