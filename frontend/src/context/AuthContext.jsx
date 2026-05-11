const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;
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

    const handleRegister = (userData) => {
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
    }

  //   async function loginUser(userData) {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(`${API_BASE_URL}/login`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //         body: JSON.stringify(userData),
  //       });

  //       const data = await response.json();

  //       if (!response.ok) {
  //         setError(data.error || "Login failed");
  //         throw new Error(data.error || "Login failed");
  //       }
  //       setUser(data.user);
  //       localStorage.setItem("token", data.token);
  //       return true;
  //     } catch (error) {
  //       console.error(error);
  //       setError(error.message);
  //       return false;
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

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
    console.log('user', user);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loginUser,
        registerUser,
        error,
        fetchCurrentUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
