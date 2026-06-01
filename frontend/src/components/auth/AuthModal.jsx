import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Modal } from "react-bootstrap";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";
import { useLocation } from "react-router-dom";
import { isPrivateRoute } from "../../utils/privateRoutes";
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
    setLogoutClicked(isPrivateRoute(location.pathname));
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
