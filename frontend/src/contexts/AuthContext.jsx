import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchCurrentUser,
  loginUser,
  registerUser,
  updateUserCredentials,
} from "../services/authService";
import PropTypes from "prop-types";
import { useNotification } from "./NotificationContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authModal, setAuthModal] = useState(null);
  const [logoutClicked, setLogoutClicked] = useState(false);
  const { addNotification } = useNotification();

  const handleRegister = async (userData) => {
    setLoading(true);

    try {
      const data = await registerUser(userData);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      addNotification("success", "User registered successfully");
      return true;
    } catch (error) {
      setError(error.message);
      addNotification(
        "danger",
        error.message
          ? `An error has occurred while registering user: ${error.message}`
          : "Something went wrong while registering user"
      );
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
      addNotification("success", "User logged in successfully");
      return true;
    } catch (error) {
      setError(error.message);
      addNotification(
        "danger",
        error.message
          ? `An error has occurred while logging in the user: ${error.message}`
          : "Something went wrong while logging in the user"
      );
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
      addNotification("success", "User fetched successfully");
      return true;
    } catch (error) {
      setError(error.message);
      setUser(null);
      localStorage.removeItem("token");
      addNotification(
        "danger",
        error.message
          ? `An error has occurred while fetching the user: ${error.message}`
          : "Something went wrong while fetching the user"
      );
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
      addNotification("success", "User logged out successfully");
    } catch (error) {
      setError(error);
      addNotification(
        "danger",
        error.message
          ? `An error has occurred while logging out the user: ${error.message}`
          : "Something went wrong while logging out the user"
      );
    } finally {
      if (withLoading) setLoading(false);
    }
  };

  const openLogin = () => setAuthModal("login");
  const openSignup = () => setAuthModal("signup");
  const closeAuthModal = () => setAuthModal(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getCurrentUser();
    }, 0);

    return () => clearTimeout(timeoutId);
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
        handleUpdate,
        authModal,
        openLogin,
        openSignup,
        closeAuthModal,
        logoutClicked,
        setLogoutClicked,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);