import React, { createContext, useContext, useEffect, useState } from "react";

const SpecialNeedContext = createContext();

export const SpecialNeedProvider = ({ children }) => {
  const BACKEND_API = "http://localhost:8080";

  const [loading, setLoading] = useState(false);
  const [specialNeeds, setSpecialNeeds] = useState([]);

  const getSpecialNeed = async () => {
    setLoading(true);

    try {
      // http://localhost:8080/api/animals?extraLove=true
      const response = await fetch(
        `${BACKEND_API}/api/animals?extraLove=true`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.log("Failed to fetch special need animals");
        throw new Error(data.msg || "Request failed");
      }
      setSpecialNeeds(data.animals || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSpecialNeed();
  }, []);

  return (
    <SpecialNeedContext.Provider
      value={{
        specialNeeds,
        loading,
      }}
    >
      {children}
    </SpecialNeedContext.Provider>
  );
};

export const useSpecialNeeds = () => useContext(SpecialNeedContext);
