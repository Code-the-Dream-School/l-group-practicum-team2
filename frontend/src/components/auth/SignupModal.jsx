import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import NameInputBox from "./NameInputBox";
import EmailInputBox from "./EmailInputBox";
import PasswordInputBox from "./PasswordInputBox";
import { useAuth } from "../../contexts/AuthContext";

const SignupModal = () => {
  const { handleRegister, openLogin, closeAuthModal } = useAuth();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await handleRegister({ email, name, password });

    if (success) {
      closeAuthModal();
    }
  };
  return (
    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>Create your account</Modal.Title>
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
            <b>Name</b>
          </Form.Label>
          <NameInputBox
            name={name}
            setName={setName}
            nameError={nameError}
            setNameError={setNameError}
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
          Already have an account?
          <Button variant="link" className="ms-1" onClick={() => openLogin()}>
            login
          </Button>
        </div>

        <Button
          type="submit"
          disabled={
            nameError !== "" ||
            name === "" ||
            emailError !== "" ||
            email === "" ||
            passwordError !== "" ||
            password === ""
          }
        >
          Register
        </Button>
      </Modal.Footer>
    </Form>
  );
};

export default SignupModal;
