// src/router/routes/authRoutes.jsx
import { lazy, Suspense } from 'react';
import LoadingSpinner from '../../components/global/LoadingSpinner';
import AuthLayout from '../../layouts/AuthLayout';
import GuestGuard from '../guards/GuestGuard';

// Actions & Components
import Address from '../../pages/register/Address';

const Register = lazy(() => import('../../pages/Register'));
const Login = lazy(() => import('../../pages/Login'));
const ForgotPassword = lazy(() => import('../../pages/ForgotPassword'));
const AccountSecurity = lazy(() => import('../../pages/register/AccountSecurity'));

const Suspended = ({ children }) => <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;

export const authRoutes = [
  {
    element: <GuestGuard />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'register',
            element: (
              <Suspended>
                <Register />
              </Suspended>
            ),
            children: [
              {
                index: true,
                element: (
                  <Suspended>
                    <AccountSecurity />
                  </Suspended>
                ),
              },
              {
                path: 'address',
                element: <Address />,
              },
            ],
          },
          {
            path: 'login',
            element: (
              <Suspended>
                <Login />
              </Suspended>
            ),
          },
          {
            path: 'forgot-password',
            element: (
              <Suspended>
                <ForgotPassword />
              </Suspended>
            ),
          },
        ],
      },
    ],
  },
];
