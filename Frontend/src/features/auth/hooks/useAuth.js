import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout } from "../services/auth.api";


export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
  setLoading(true);

  try {
    console.log("handleLogin started");

    const data = await login({ email, password });

    console.log("login response:", data);

    setUser(data.user);
    return data;
  } catch (err) {
    console.log("handleLogin error:", err.response?.data || err.message);
    throw err;
  } finally {
    console.log("loading false");
    setLoading(false);
  }
};

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  

  return { user, loading, handleRegister, handleLogin, handleLogout };
};