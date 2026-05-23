import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Modal } from "react-bootstrap";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import { useNavigate, useLocation } from "react-router-dom";

const AuthModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    user,
    authModal,
    openLogin,
    closeAuthModal,
    loading,
    logoutClicked,
    setLogoutClicked,
  } = useAuth();
  const privatePathnames = ["/favorites", "/profile", "/profile/inquiries"];

  const handleHide = () => {
    closeAuthModal();
    setLogoutClicked(true);
  };

  useEffect(() => {
    if (
      !user &&
      !logoutClicked &&
      !loading &&
      privatePathnames.includes(location.pathname) &&
      authModal === null
    ) {
      openLogin();
    }
  }, [location.pathname, user, loading, logoutClicked, authModal]);

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
