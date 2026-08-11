import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // CHECK CURRENT USER
  // ==========================================

  const checkAuth = async () => {
    try {
      setLoading(true);

      // First try existing access token
      const response = await api.get("/auth/me");

      if (response.data?.success) {
        setUser(response.data.user);
        return;
      }

    } catch (error) {
      // Access token may be expired.
      // Try refresh token.
      try {
        await api.post("/auth/refresh-token");

        const response = await api.get("/auth/me");

        if (response.data?.success) {
          setUser(response.data.user);
          return;
        }

      } catch (refreshError) {
        console.log(
          "AUTH CHECK FAILED:",
          refreshError.response?.data || refreshError
        );

        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOGIN
  // ==========================================

  const loginUser = async (loginData) => {
    const response = await api.post(
      "/auth/login",
      loginData
    );

    if (response.data?.success) {
      const meResponse = await api.get("/auth/me");

      setUser(meResponse.data.user);
    }

    return response;
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logoutUser = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error(
        "LOGOUT ERROR:",
        error.response?.data || error
      );
    } finally {
      setUser(null);
    }
  };

  // ==========================================
  // CHECK AUTH ON APP START
  // ==========================================

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
        logoutUser,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;