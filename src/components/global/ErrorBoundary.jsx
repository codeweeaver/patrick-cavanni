// src/components/ErrorBoundary.jsx
import { Link, useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-red-600">
          {error.status === 404 ? 'Page Not Found' : 'Something went wrong'}
        </h1>
        <p className="mb-6 text-gray-600">
          {error.status === 404
            ? "The page you're looking for doesn't exist or has been moved."
            : error.message || 'An unexpected error occurred.'}
        </p>
        <Link
          to="/"
          className="bg-primary hover:bg-primary-dark inline-block rounded-md px-6 py-2 text-white transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default ErrorBoundary;
