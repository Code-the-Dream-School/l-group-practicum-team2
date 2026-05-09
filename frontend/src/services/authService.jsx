const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  async function registerUser(userData) {
    setLoading(true);
    try{
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
    
      if (!response.ok) {
        console.log('data.error', data.error);
        throw new Error(data.error || "Registration failed");
      }
      setUser(data.user)
      localStorage.setItem("token", data.token)

    } catch(error){
      console.error(error);

    } finally{
      setLoading(false);
    }
  }

  async function loginUser(userData) {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }
      setUser(data.user)
      localStorage.setItem("token", data.token)
      return;

  } catch (error) {
    console.error(error);
  }
  finally {
    setLoading(false);
  }
  }

  return (
      <AuthContext.Provider value={{ user, loginUser, registerUser }}>
          {children}
      </AuthContext.Provider> 
  )
}

export const useAuth = () => useContext(AuthContext)
