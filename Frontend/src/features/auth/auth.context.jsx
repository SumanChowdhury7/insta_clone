// AuthContext.jsx
import { createContext, useEffect, useState } from "react";
import { login, register, getMe } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // start as true
  const [error, setError] = useState(null);

  // Fetch logged-in user
  const fetchMe = async () => {
    setLoading(true);
    try {
      const res = await getMe();
      setUser(res.user || null);
      setError(null);
    } catch (err) {
      setUser(null);
      setError(err.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  // Login handler
  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const res = await login(username, password);
      setUser(res.user);
      setError(null);
      return res;
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register handler
  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const res = await register(username, email, password);
      setUser(res.user);
      setError(null);
      return res;
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        handleLogin,
        handleRegister,
        fetchMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}