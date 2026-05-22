import { Modal, Button } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import { useAuth } from '../../contexts/AuthContext';

export const SigninButton = () => {
  const { openLogin } = useAuth();
  return (
    <>
      <Button
        variant="primary"
        className="px-4 py-2"
        onClick={() => openLogin()}
      >
        <PersonFill size={25} className="me-1" />
        <span className="fs-5">Sign in</span>
      </Button>
    </>
  );
};
