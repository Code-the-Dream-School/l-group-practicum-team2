import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const AuthModal = () => {
  const location = useLocation();

  const {
    user,
    authModal,
    openLogin,
    closeAuthModal,
    loading,
    logoutClicked,
    setLogoutClicked,
  } = useAuth();

  const handleHide = () => {
    closeAuthModal();
    setLogoutClicked(true);
  };

  useEffect(() => {
    const privatePathnames = ["/favorites", "/profile", "/profile/inquiries"];

    if (
      !user &&
      !logoutClicked &&
      !loading &&
      privatePathnames.includes(location.pathname) &&
      authModal === null
    ) {
      openLogin();
    }
  }, [location.pathname, user, loading, logoutClicked, authModal, openLogin]);

  return (
    <Modal show={authModal !== null} onHide={handleHide} size="md">
      {authModal === "login" ? (
        <LoginModal />
      ) : authModal === "signup" ? (
        <SignupModal />
      ) : null}
    </Modal>
  );
};

export default AuthModal;