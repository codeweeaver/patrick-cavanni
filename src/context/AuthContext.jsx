import { createContext, useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useLoading } from "../hooks/useLoading";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(
      localStorage.getItem("user") || sessionStorage.getItem("user")
    ) || null
  );
  const [token, setToken] = useState(
    JSON.parse(
      localStorage.getItem("token") || sessionStorage.getItem("token")
    ) || null
  );
  const { startLoading, stopLoading } = useLoading();

  const loginUser = useCallback(
    async (email, password, rememberMe = false) => {
      startLoading();
      try {
        const res = await fetch("http://localhost:3000/users");

        if (!res.ok) {
          throw new Error(`Invalid Credientials`);
        }
        const data = await res.json();

        const foundUser = data.find(
          (u) => u.email === email && u.password === password
        );

        if (!foundUser) {
          throw new Error("Invalid email or password");
        }

        const {
          password: _password,
          confirmPassword: _confirmPassword,
          createdAt: _createdAt,
          ...userWithoutPassword
        } = foundUser;

        setUser(userWithoutPassword);

        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("user", JSON.stringify(userWithoutPassword));

        const newToken = `sample-token-${Date.now()}`;
        setToken(newToken);
        storage.setItem("token", JSON.stringify(newToken));

        toast.success("Logged in successfully.");
        return userWithoutPassword;
      } catch (error) {
        if (error?.message) {
          toast.error(error.message);
        } else {
          toast.error(error.message);
        }
        throw error; // <-- Crucial: Re-throw the error
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  const logOut = useCallback(async () => {
    try {
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      toast.success("Logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out.");
    }
  }, []);

  // This listener is now the SINGLE source of truth

  const authValue = useMemo(
    () => ({
      user,
      loginUser,
      logOut,
      token,
    }),
    [user, token, loginUser, logOut]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
