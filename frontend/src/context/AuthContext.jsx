import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  registerUser,
  fetchCurrentUser,
  //   logoutUser,
} from "../services/authService";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (userData) => {
    setLoading(true);
    try {
      const data = await registerUser(userData);

      setUser(data.user);
      localStorage.setItem("token", data.token);
      return true;
    } catch (error) {
      console.error(error);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (userData) => {
    setLoading(true);
    try {
      const data = await loginUser(userData);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      return true;
    } catch (error) {
      console.error(error);
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = async () => {
    setLoading(true);

    try {
      const data = await fetchCurrentUser();
      setUser(data.user);
      setError(null);

      return true;
    } catch (error) {
      console.error(error);
      setError(error.message);
      setUser(null);
      localStorage.removeItem("token");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        handleLogin,
        handleRegister,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
