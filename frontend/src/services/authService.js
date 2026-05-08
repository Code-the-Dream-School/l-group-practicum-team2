const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAlert } from './AlertContext'
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();


export async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Registration failed");
  }

  return data;
}

export async function loginUser(userData) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }

  return data;
}

export const AuthProvider = ({ children }) => {
   
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate();

  export async function fetchCurrentUser() {
    setLoading(true);

    if(!localStorage.getItem("token")){
      setLoading(false);
      return null;
    }
        
    // await new Promise((resolve)=>setTimeout(resolve, 2000))
    try{
        const response = await fetch(`${API_BASE_URL}/me`,{
            'method': "GET",
            'headers': {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Accept': "application/json",
            }
        })
        if (response.status === 401) { 
            throw new Error("Session expired. Please login again.");
        }
        const data = await response.json()
        if(!response.ok) {
            throw new Error(data.message || "Failed to fetch current user")
        }
        setUser(data.user)
    }
    catch(error){
        console.error(error);
        logout(true);
    } 
    finally {
        setLoading(false);
    }
  }
}