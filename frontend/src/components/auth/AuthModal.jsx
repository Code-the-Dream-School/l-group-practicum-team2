import { useAuth } from "../../contexts/AuthContext";
import { Modal } from "react-bootstrap";
import SignupModal from "./SignupModal";
import LoginModal from "./LoginModal";

const AuthModal = () => {
    const { user, authModal, closeAuthModal, loading } = useAuth();
    return(
        <Modal show={authModal !== null} onHide={closeAuthModal} size="md">
            {authModal === "login" ? (
                <LoginModal />
            ) : (
                <SignupModal />
            )}
        </Modal>
    )
}
export default AuthModal;