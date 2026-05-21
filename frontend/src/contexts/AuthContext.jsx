import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteAccount,
  fetchCurrentUser,
  loginUser,
  registerUser,
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
      setUser(data && data.user ? data.user : null);
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

  const handleDelete = async (currentPassword) => {
    setLoading(true);
    setError(null);

    try {
      const data = await deleteAccount(currentPassword);

      setUser(null);
      localStorage.removeItem("token");
      setError(null);
      navigate("/", { replace: true });

      return {
        success: true,
        message:
          data.data?.message ||
          data.message ||
          "User account deleted successfully",
      };
    } catch (error) {
      console.error(error);
      setError(error.message);

      return {
        success: false,
        message: error.message || "Failed to delete account",
      };
    } finally {
      setLoading(false);
    }
  };
  const logoutUser = async (withLoading = true) => {
    if (withLoading) setLoading(true);

    try {
      setUser(null);
      // uncomment when FavoriteContext and InquiryCOntext is ready
      // setFavorites([]);
      // setInquiries([]);
      localStorage.removeItem("token");
    } catch (error) {
      console.error(error);
    } finally {
      if (withLoading) setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    fetchCurrentUser()
      .then((data) => {
        if (!ignore) {
          setUser(data && data.user ? data.user : null);
          setError(null);
        }
      })
      .catch((error) => {
        if (!ignore) {
          console.error(error);
          setError(error.message);
          setUser(null);
          localStorage.removeItem("token");
        }
      });

    return () => {
      ignore = true;
    };
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
        handleDelete,
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
