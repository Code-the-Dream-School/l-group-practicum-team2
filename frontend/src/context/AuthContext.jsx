import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    // for testing only — remove when backend auth is ready
    {
      id: "e070302d-2b83-44b4-b728-aa0b597fdfeb",
      name: "John",
      email: "user1@bb.com",
    }

    // production version:
    // null
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
    console.log("user changed:", user);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
