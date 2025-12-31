// src/router/routes/authRoutes.jsx
import { lazy, Suspense } from "react";
import LoadingSpinner from "../../components/global/LoadingSpinner";
import AuthLayout from "../../layouts/AuthLayout";
import GuestGuard from "../guards/GuestGuard";

// Actions & Components
import { accountSecurityAction } from "../../pages/register/AccountSecurity";
import Address, { addressAction } from "../../pages/register/Address";
import { personalInfoAction } from "../../pages/register/PersonInfo";

const Register = lazy(() => import("../../pages/Register"));
const Login = lazy(() => import("../../pages/Login"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const AccountSecurity = lazy(() =>
  import("../../pages/register/AccountSecurity")
);
const PesonalInfo = lazy(() => import("../../pages/register/PersonInfo"));


const Suspended = ({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
);

export const authRoutes = [
  {
    element: <GuestGuard />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "register",
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
                action: accountSecurityAction,
              },
              {
                path: "personal-info",
                element: (
                  <Suspended>
                    <PesonalInfo />
                  </Suspended>
                ),
                action: personalInfoAction,
              },
              {
                path: "address",
                element: <Address />,
                action: addressAction,
              },
            ],
          },
          {
            path: "login",
            element: (
              <Suspended>
                <Login />
              </Suspended>
            ),
          },
          {
            path: "forgot-password",
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
