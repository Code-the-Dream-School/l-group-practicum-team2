import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getUserInquiries, addInquiry } from "../services/inquiryService";
import { useAuth } from "./AuthContext";
import { useNotification } from "./NotificationContext";
import PropTypes from "prop-types";

const InquiryContext = createContext();

export const InquiryProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [pendingMessageObj, setPendingMessageObj] = useState(null);
  const { addNotification } = useNotification();

  const { user, openLogin } = useAuth();
  const { addNotification } = useNotification();

  const getInquiries = useCallback(async () => {
    if (!user) {
      setInquiries([]);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await getUserInquiries();

      setInquiries(res.data);
    } catch (error) {
      addNotification(
        "danger",
        error.message
          ? `An error has occurred while fetching inquiries: ${error.message}`
          : "Something went wrong while fetching inquiries"
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  const handleAddInquiry = useCallback(
    async ({ animalId, message }) => {
      setLoading(true);

    try {
      await addInquiry({ animalId, message });
      await getInquiries();
      addNotification("success",  "Your inquiry has been sent! The shelter will contact you soon.");
    } catch (error) {
      addNotification("danger",  error.message || "Something went wrong. Please try again.");
      
    } finally {
      setLoading(false);
    }
  };
  const requestAddInquiry = async (messageObj) => {
    if (!user) {
      setPendingMessageObj(messageObj);
      openLogin();
      return;
    }
    await handleAddInquiry(messageObj);
  };

  useEffect(() => {
    const loadInquiries = async () => {
      getInquiries();
    };
    loadInquiries();
  }, [getInquiries]);

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
