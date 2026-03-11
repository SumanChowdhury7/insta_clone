
import { createContext, useEffect, useState } from "react";
import { login, register, getMe, logout } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  // Fetchme
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
  const handleLogout = async ()=>{
  setLoading(true);
  try {
    await logout();
    setUser(null)     
  } finally {
    setLoading(false);
  }
}

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        handleLogin,
        handleRegister,
        handleLogout,
        fetchMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}