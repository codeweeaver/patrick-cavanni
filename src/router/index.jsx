import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "../components/global/ErrorBoundary";
import LoadingSpinner from "../components/global/LoadingSpinner";

// Route Modules
import { adminRoutes } from "./routes/adminRoutes";
import { authRoutes } from "./routes/authRoutes";
import { publicRoutes } from "./routes/publicRoutes";

// Global Lazy Pages
const NotFound = lazy(() => import("../pages/NotFound"));
const Unauthorized = lazy(() => import("../pages/Unauthorized"));

// Create the router
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorBoundary />,
    children: [
      ...publicRoutes,
      ...authRoutes,
      ...adminRoutes,
      {
        path: "unauthorized",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Unauthorized />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
