import { Button, Spinner } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import { useAuth } from "../../contexts/AuthContext";

export const SigninButton = () => {
  const { openLogin, loading } = useAuth();
  if(loading) {
    return (
      <Button
        variant="primary"
        className="px-4 py-2 signin-button"
        disabled={true}
      >
        <Spinner animation="border" size="sm" />
      </Button>
    )
  }
    
  return (
    <>
      <Button
        variant="primary"
        className="px-4 py-2 signin-button"
        onClick={() => openLogin()}
      >
        <PersonFill size={25} className="me-1" />
        <span className="fs-5">Sign in</span>
      </Button>
    </>
  );
};
