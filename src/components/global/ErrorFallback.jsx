const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-lg bg-red-50 p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-red-600">Something went wrong</h2>
        <pre className="mb-6 overflow-auto rounded bg-red-100 p-4 text-red-500">
          {error.message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          className="rounded-md bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
