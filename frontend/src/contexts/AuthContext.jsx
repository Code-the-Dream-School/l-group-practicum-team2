import PropTypes from "prop-types";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  deleteAccount,
  fetchCurrentUser,
  loginUser,
  registerUser,
  updateUserCredentials,
} from "../services/authService";
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
      addNotification("success", "Profile updated successfully");
      return true;
    } catch (error) {
      setError(error.message);
      addNotification("danger", 
        error.message
          ? `An error has occurred while updating user profile: ${error.message}`
          : "A network error occurred. Please try again."
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getCurrentUser = useCallback(async () => {
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
  }, []);

  const handleDelete = async (currentPassword) => {
    setLoading(true);
    setError(null);

    try {
      const data = await deleteAccount(currentPassword);

      setUser(null);
      localStorage.removeItem("token");
      setError(null);

      addNotification("success", "Your account has been successfully deleted.");
      setLogoutClicked(true);

      return true;
    } catch (error) {
      addNotification(
        "danger",
        data.message || "A network error occurred."
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
    const loadCurrentUser = async () => {
      await getCurrentUser();
    };

    loadCurrentUser();
  }, [getCurrentUser]);

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
        handleDelete,
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
