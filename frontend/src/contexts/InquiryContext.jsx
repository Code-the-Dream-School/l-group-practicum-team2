import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { addInquiry, getUserInquiries } from "../services/inquiryService";
import { useAuth } from "./AuthContext";

const InquiryContext = createContext();

export const InquiryProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [pendingMessageObj, setPendingMessageObj] = useState(null);

  const { user, openLogin } = useAuth();

  const getInquiries = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const data = await getUserInquiries();
      setInquiries(data);
    } catch (error) {
      setError(
        error.message || "Something went wrong while fetching inquiries"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddInquiry = useCallback(
    async ({ animalId, message }) => {
      setLoading(true);

      try {
        await addInquiry({ animalId, message });
        await getInquiries();
      } catch (error) {
        setError(
          error.message || "Something went wrong while adding inquiries"
        );
      } finally {
        setLoading(false);
      }
    },
    [getInquiries]
  );

  const requestAddInquiry = async (messageObj) => {
    if (!user) {
      setPendingMessageObj(messageObj);
      openLogin();
      return;
    }

    await handleAddInquiry(messageObj);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!user) {
        setInquiries([]);
        return;
      }

      getInquiries();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [user, getInquiries]);

  useEffect(() => {
    if (!user || !pendingMessageObj) return;

    const addPendingMessage = async () => {
      await handleAddInquiry(pendingMessageObj);
      setPendingMessageObj(null);
    };

    addPendingMessage();
  }, [pendingMessageObj, user, handleAddInquiry]);

  return (
    <InquiryContext.Provider
      value={{
        inquiries,
        requestAddInquiry,
        loading,
        error,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

InquiryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useInquiry = () => useContext(InquiryContext);
