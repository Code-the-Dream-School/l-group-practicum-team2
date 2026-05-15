import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const SpecialNeedContext = createContext();

export const SpecialNeedProvider = ({ children }) => {
  const BACKEND_API = import.meta.env.VITE_API_BASE_URL;

  const [loading, setLoading] = useState(false);
  const [specialNeeds, setSpecialNeeds] = useState([]);

  const getSpecialNeed = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${BACKEND_API}/api/animals?special_needs=true&status=available`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to fetch special need animals");
      }
      setSpecialNeeds(data.animals || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [BACKEND_API]);

  useEffect(() => {
    async function loadData() {
      await getSpecialNeed();
    }
    loadData();
  }, [getSpecialNeed]);

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

SpecialNeedProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSpecialNeeds = () => useContext(SpecialNeedContext);
