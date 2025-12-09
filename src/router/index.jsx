// src/router/index.jsx
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ErrorBoundary from "../components/global/ErrorBoundary";
import LoadingSpinner from "../components/global/LoadingSpinner";
import Layout from "../layouts/Layout";

// Lazy load pages with dynamic imports
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Blogs = lazy(() => import("../pages/Blogs"));
const Products = lazy(() => import("../pages/products/Products"));
const ProductDetail = lazy(() => import("../pages/products/ProductDetail"));
const Collection = lazy(() => import("../pages/Collection"));
const NotFound = lazy(() => import("../pages/NotFound"));

// loaders
import { productsLoader } from "../pages/products/Products";

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

// Create the router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
      <Route
        index
        element={
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        }
      />

      <Route
        path="products"
        element={
          <Suspense fallback={<Loading />}>
            <Products />
          </Suspense>
        }
        loader={productsLoader}
      >
        <Route
          path=":productId"
          element={
            <Suspense fallback={<Loading />}>
              <ProductDetail />
            </Suspense>
          }
        />
      </Route>

      <Route
        path="blogs"
        element={
          <Suspense fallback={<Loading />}>
            <Blogs />
          </Suspense>
        }
      >
        <Route
          path=":blogId"
          element={
            <Suspense fallback={<Loading />}>
              <h1>this is the blogs detail page</h1>
            </Suspense>
          }
        ></Route>
      </Route>

      <Route
        path="about"
        element={
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        }
      />

      <Route
        path="/collections"
        element={
          <Suspense fallback={<Loading />}>
            <Collection />
          </Suspense>
        }
      />

      <Route
        path="*"
        element={
          <Suspense fallback={<Loading />}>
            <NotFound />
          </Suspense>
        }
      />
    </Route>
  )
);

export default router;
