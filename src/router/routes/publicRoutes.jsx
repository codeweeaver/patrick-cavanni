// src/router/routes/publicRoutes.jsx
import { lazy, Suspense } from 'react';
import LoadingSpinner from '../../components/global/LoadingSpinner';
import HelpLayout from '../../layouts/HelpLayout';
import Layout from '../../layouts/Layout';

// Lazy Pages
const Home = lazy(() => import('../../pages/Home'));
const About = lazy(() => import('../../pages/About'));
const Blogs = lazy(() => import('../../pages/blogs/Blogs'));
const BlogDetails = lazy(() => import('../../pages/blogs/BlogDetails'));
const Products = lazy(() => import('../../pages/products/Products'));
const ProductDetail = lazy(() => import('../../pages/products/ProductDetail'));

// Help Pages (Assuming these are not lazy based on original file, but you can make them lazy if needed)
import HelpContact from '../../pages/help/HelpContact';
import HelpOrder from '../../pages/help/HelpOrder';
import HelpPayment from '../../pages/help/HelpPayment';
import HelpReturn from '../../pages/help/HelpReturn';
import HelpShipping from '../../pages/help/HelpShipping';

// src/router/routes/userRoutes.jsx
import UserProfileLayout from '../../layouts/UserProfileLayout';
import AuthGuard from '../guards/AuthGuard';

const UserOrders = lazy(() => import('../../pages/profile/UserOrders'));
const UserSettings = lazy(() => import('../../pages/profile/UserSettings'));
const UserWishlist = lazy(() => import('../../pages/profile/UserWishlist'));
const UserReviews = lazy(() => import('../../pages/profile/UserReviews'));
const UserOverview = lazy(() => import('../../pages/profile/UserOverview'));
const UserCart = lazy(() => import('../../pages/profile/UserCart'));

const Suspended = ({ children }) => <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;

export const publicRoutes = [
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspended>
            <Home />
          </Suspended>
        ),
      },
      {
        path: 'products',
        element: (
          <Suspended>
            <Products />
          </Suspended>
        ),
      },
      {
        path: 'products/:productId',
        element: (
          <Suspended>
            <ProductDetail />
          </Suspended>
        ),
      },
      {
        path: 'collections',
        element: <h2>Collections</h2>,
        children: [
          { index: true, element: <h2>Cavanni Wardrobe</h2> },
          { path: 'haute-couture', element: <h2>Haute Couture</h2> },
        ],
      },
      {
        path: 'blogs',
        element: (
          <Suspended>
            <Blogs />
          </Suspended>
        ),
      },
      {
        path: 'blogs/:blogId',
        element: (
          <Suspended>
            <BlogDetails />
          </Suspended>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspended>
            <About />
          </Suspended>
        ),
      },
      {
        element: <AuthGuard allowedRoles={['user']} />,
        children: [
          {
            path: '/profile',
            element: <UserProfileLayout />,
            children: [
              {
                index: true,
                element: (
                  <Suspended>
                    <UserOverview />
                  </Suspended>
                ),
              },
              {
                path: 'orders',
                element: (
                  <Suspended>
                    <UserOrders />
                  </Suspended>
                ),
              },
              {
                path: 'cart',
                element: (
                  <Suspended>
                    <UserCart />
                  </Suspended>
                ),
              },
              {
                path: 'wishlist',
                element: (
                  <Suspended>
                    <UserWishlist />
                  </Suspended>
                ),
              },
              {
                path: 'reviews',
                element: (
                  <Suspended>
                    <UserReviews />
                  </Suspended>
                ),
              },
              {
                path: 'settings',
                element: (
                  <Suspended>
                    <UserSettings />
                  </Suspended>
                ),
              },
            ],
          },
        ],
      },
      {
        path: 'help-center',
        element: <HelpLayout />,
        children: [
          { index: true, element: <HelpPayment /> },
          { path: 'order', element: <HelpOrder /> },
          { path: 'return', element: <HelpReturn /> },
          { path: 'shipping', element: <HelpShipping /> },
          { path: 'contact', element: <HelpContact /> },
        ],
      },
    ],
  },
];
