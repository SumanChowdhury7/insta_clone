import { createContext, useEffect, useState } from "react";
import { login, register, getMe } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 true initially

  // ✅ App load pe cookie se user fetch
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await getMe();
        setUser(res.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const response = await login(username, password);
      setUser(response.user);
      return response;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email, username, password) => {
    setLoading(true);
    try {
      const response = await register(username, email, password);
      setUser(response.user);
      return response;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleLogin, handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
}