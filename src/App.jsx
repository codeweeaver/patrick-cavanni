// src/App.jsx
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import LoadingSpinner from "./components/global/LoadingSpinner";
import router from "./router";

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div
      role="alert"
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="bg-red-50 p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong
        </h2>
        <pre className="text-red-500 bg-red-100 p-4 rounded overflow-auto mb-6">
          {error.message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RouterProvider
        router={router}
        // This fallback will be shown during initial route loading
        fallbackElement={<LoadingSpinner size="lg" />}
      />
      <Toaster position="top-right" />
    </ErrorBoundary>
  );
};

export default App;
