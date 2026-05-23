import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Modal } from "react-bootstrap";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import { useLocation } from "react-router-dom";

const AuthModal = () => {
  const location = useLocation();
  const { user, authModal, openLogin, closeAuthModal, loading, logoutClicked } =
    useAuth();
  const privatePathnames = ["/favorites", "/profile", "/inquiries"];

  useEffect(() => {
    if (
      !user &&
      !logoutClicked &&
      !loading &&
      privatePathnames.includes(location.pathname)
    ) {
      openLogin();
    }
  }, [location.pathname, user, loading, logoutClicked]);

  return (
    <Modal show={authModal !== null} onHide={closeAuthModal} size="md">
      {authModal === "login" ? <LoginModal /> : <SignupModal />}
    </Modal>
  );
};
export default AuthModal;
