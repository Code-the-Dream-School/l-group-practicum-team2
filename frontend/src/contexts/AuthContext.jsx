import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  registerUser,
  fetchCurrentUser,
  updateUserCredentials,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authModal, setAuthModal] = useState(null);
  const [logoutClicked, setLogoutClicked] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (userData) => {
    setLoading(true);
    try {
      const data = await registerUser(userData);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      return true;
    } catch (error) {
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
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = async (userData) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const data = await updateUserCredentials(userData, token);

      setUser(data.user);

      setError(null);

      return true;
    } catch (error) {
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
      setUser(data && data.user ? data.user : null);
      setError(null);
      return true;
    } catch (error) {
      setError(error.message);
      setUser(null);
      localStorage.removeItem("token");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async (withLoading = true) => {
    if (withLoading) setLoading(true);

    try {
      
      setUser(null);
      localStorage.removeItem("token");
      setLogoutClicked(true);
    } catch (error) {
      console.error(error);
    } finally {
      if (withLoading) setLoading(false);
    }
  };

  const openLogin = () =>setAuthModal("login");
  const openSignup = () => setAuthModal('signup');
  const closeAuthModal = () => setAuthModal(null);

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        handleLogin,
        handleRegister,
        getCurrentUser,
        logoutUser,
<<<<<<< HEAD
        handleUpdate,
=======
        
        authModal, 
        setAuthModal,
>>>>>>> 6c77f0ef (set auth loading true while fetching current user on app load)

        openLogin,
        openSignup,
        closeAuthModal,

        logoutClicked 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
