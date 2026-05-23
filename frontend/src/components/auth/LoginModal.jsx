import { Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import EmailInputBox from "./EmailInputBox";
import PasswordInputBox from "./PasswordInputBox";
import { useAuth } from "../../contexts/AuthContext";
import PropTypes from "prop-types";

const LoginModal = ({ setShow }) => {
  const { handleLogin, openSignup, closeAuthModal } = useAuth();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await handleLogin({ email, password });

    if (success) {
      closeAuthModal();
    }
    // Notification bar (coming soon) will display the error
  };
  return (
    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>Sign in to your account</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="my-3">
          <Form.Label>
            <b>Email</b>
          </Form.Label>
          <EmailInputBox
            email={email}
            setEmail={setEmail}
            emailError={emailError}
            setEmailError={setEmailError}
          />
        </div>
        <div className="my-3">
          <Form.Label>
            <b>Password</b>
          </Form.Label>
          <PasswordInputBox
            password={password}
            setPassword={setPassword}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between align-items-center">
        <div>
          Don’t have an account?
          <Button variant="link" className="ms-1" onClick={() => openSignup()}>
            Register
          </Button>
        </div>
        <Button
          type="submit"
          disabled={
            emailError !== "" ||
            email === "" ||
            passwordError !== "" ||
            password === ""
          }
        >
          Sign In
        </Button>
      </Modal.Footer>
    </Form>
  );
};
LoginModal.propTypes = {
  setShow: PropTypes.func.isRequired,
};

export default LoginModal;
