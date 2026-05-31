import { useState, useEffect } from "react";
import { Spinner, Modal, Form, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import NameInputBox from "../auth/NameInputBox";
import PasswordInputBox from "../auth/PasswordInputBox";

const EditNameModal = ({ showNameModal, onHide }) => {
  const { handleUpdate, loading: authLoading } = useAuth();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const success = await handleUpdate({
      name,
      currentPassword: currentPassword,
    });
    if (success) onHide();
  };
  useEffect(() => {
    if (showNameModal) {
      setName("");
      setNameError("");
      setCurrentPassword("");
      setCurrentPasswordError("");
    }
  }, [showNameModal]);

  return (
    <Modal show={showNameModal} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Name</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleProfileUpdate}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>New Name</Form.Label>

            <NameInputBox
              name={name}
              setName={setName}
              nameError={nameError}
              setNameError={setNameError}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>

            <PasswordInputBox
              password={currentPassword}
              setPassword={setCurrentPassword}
              passwordError={currentPasswordError}
              setPasswordError={setCurrentPasswordError}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={
              nameError ||
              currentPasswordError ||
              name.trim() === "" ||
              currentPassword.trim() === "" ||
              authLoading
            }
          >
            {authLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default EditNameModal;
