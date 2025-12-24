Route; // src/router/index.jsx
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ErrorBoundary from "../components/global/ErrorBoundary";
import LoadingSpinner from "../components/global/LoadingSpinner";
// layouts
import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";
import HelpLayout from "../layouts/HelpLayout";
import Layout from "../layouts/Layout";
import UserProfileLayout from "../layouts/UserProfileLayout";

// Lazy load pages with dynamic imports
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Blogs = lazy(() => import("../pages/blogs/Blogs"));
const BlogDetails = lazy(() => import("../pages/blogs/BlogDetails"));
const Products = lazy(() => import("../pages/products/Products"));
const ProductDetail = lazy(() => import("../pages/products/ProductDetail"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Unauthorized = lazy(() => import("../pages/Unauthorized"));
const UserProfile = lazy(() => import("../pages/profile/UserProfile"));

// auth
const Register = lazy(() => import("../pages/Register"));
const Login = lazy(() => import("../pages/Login"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const AccountSecurity = lazy(() => import("../pages/register/AccountSecurity"));
const PesonalInfo = lazy(() => import("../pages/register/PersonInfo"));

// help-center
import HelpContact from "../pages/help/HelpContact";
import HelpOrder from "../pages/help/HelpOrder";
import HelpPayment from "../pages/help/HelpPayment";
import HelpReturn from "../pages/help/HelpReturn";
import HelpShipping from "../pages/help/HelpShipping";

//loaders
import { productsDetailLoader } from "../pages/products/ProductDetail";
import { productsLoader } from "../pages/products/Products";
import { accountSecurityAction } from "../pages/register/AccountSecurity";
import Address, { addressAction } from "../pages/register/Address";
import { personalInfoAction } from "../pages/register/PersonInfo";

//guards
import AuthGuard from "../router/guards/AuthGuard";
import GuestGuard from "../router/guards/GuestGuard";

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

// Create the router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorBoundary />}>
      <Route element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          }
        />

        {/* products routes */}
        <Route
          path="products"
          element={
            <Suspense fallback={<Loading />}>
              <Products />
            </Suspense>
          }
          loader={productsLoader}
        />
        <Route
          path="products/:productId"
          element={
            <Suspense fallback={<Loading />}>
              <ProductDetail />
            </Suspense>
          }
          loader={productsDetailLoader}
        />

        {/* collection */}
        <Route path="collections" element={<h2>Collections</h2>}>
          <Route index element={<h2>Cavanni Wardrobe</h2>} />
          <Route path="haute-couture" element={<h2>Haute Couture</h2>} />
        </Route>

        {/* blogs routes */}
        <Route
          path="blogs"
          element={
            <Suspense fallback={<Loading />}>
              <Blogs />
            </Suspense>
          }
        />

        <Route
          path="blogs/:blogId"
          element={
            <Suspense fallback={<Loading />}>
              <BlogDetails />
            </Suspense>
          }
        />

        <Route
          path="about"
          element={
            <Suspense fallback={<Loading />}>
              <About />
            </Suspense>
          }
        />

        {/* help center */}
        <Route path="/help-center" element={<HelpLayout />}>
          <Route index element={HelpPayment} />
          <Route path="order" element={<HelpOrder />} />
          <Route path="return" element={<HelpReturn />} />
          <Route path="shipping" element={<HelpShipping />} />
          <Route path="contact" element={<HelpContact />} />
        </Route>
      </Route>

      {/* protected routes */}
      <Route element={<AuthGuard allowedRoles={["user"]} />}>
        <Route path="/profile" element={<UserProfileLayout />}>
          <Route index element={<UserProfile />} />
          <Route path="settings" element={<h2>Settings</h2>} />
          <Route path="wishlist" element={<h2>Wishlist</h2>} />
          <Route path="upgrade" element={<h2>Upgrade</h2>} />
          <Route path="cart" element={<h2>Cart Component</h2>} />
        </Route>
      </Route>

      {/* Auth Routes */}
      <Route element={<GuestGuard />}>
        <Route element={<AuthLayout />}>
          <Route path="register" element={<Register />}>
            <Route
              index
              element={<AccountSecurity />}
              action={accountSecurityAction}
            />
            <Route
              path="personal-info"
              element={<PesonalInfo />}
              action={personalInfoAction}
            />
            <Route
              path="address"
              element={<Address />}
              action={addressAction}
            />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
      </Route>

      {/* admin */}
      <Route element={<AuthGuard allowedRoles={["admin"]} />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<h2>Admin Dashboard</h2>} />
        </Route>
      </Route>

      <Route
        path="unauthorized"
        element={
          <Suspense fallback={<Loading />}>
            <Unauthorized />
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
