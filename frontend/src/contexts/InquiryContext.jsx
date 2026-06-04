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
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [addInquiryLoading, setAddInquiryLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [pendingMessageObj, setPendingMessageObj] = useState(null);
  const { addNotification } = useNotification();

  const { user, openLogin } = useAuth();

  const getInquiries = useCallback(async () => {
    if (!user) {
      setInquiries([]);
      return;
    }
    setError(null);
    setInquiriesLoading(true);
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
      setInquiriesLoading(false);
    }
  }, [user, addNotification]);

  const handleAddInquiry = useCallback(
    async ({ animalId, message }) => {
      setAddInquiryLoading(true);

      try {
        await addInquiry({ animalId, message });
        await getInquiries();
        addNotification(
          "success",
          "Your inquiry has been sent! The shelter will contact you soon."
        );
        return true;
      } catch (error) {
        addNotification(
          "danger",
          error.message || "Something went wrong. Please try again."
        );
        return false;
      } finally {
        setAddInquiryLoading(false);
      }
    },
    [getInquiries, addNotification]
  );

  const requestAddInquiry = async (messageObj) => {
    if (!user) {
      setPendingMessageObj(messageObj);
      openLogin();
      return;
    }
    return handleAddInquiry(messageObj);
  };


  useEffect(() => {
      const loadInquiries=async()=>{
        await getInquiries();
      }
      loadInquiries();
  
    }, [ getInquiries]);

  useEffect(() => {
    if (!user || !pendingMessageObj) return;

    const addPendingMessage = async () => {
      const msg = pendingMessageObj;
      setPendingMessageObj(null);

      await handleAddInquiry(msg);
      
    };

    addPendingMessage();
  }, [pendingMessageObj, user, handleAddInquiry]);

  return (
    <InquiryContext.Provider
      value={{
        inquiries,
        requestAddInquiry,
        inquiriesLoading,
        addInquiryLoading,
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
