// src/components/ErrorBoundary.jsx
import { Link, useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          {error.status === 404 ? "Page Not Found" : "Something went wrong"}
        </h1>
        <p className="text-gray-600 mb-6">
          {error.status === 404
            ? "The page you're looking for doesn't exist or has been moved."
            : error.message || "An unexpected error occurred."}
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default ErrorBoundary;
