import { useState, useEffect } from "react";
import { Spinner, Modal, Form, Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import PasswordInputBox from "../auth/PasswordInputBox";
import PropTypes from "prop-types";

const EditPasswordModal = ({ showPasswordModal, onHide }) => {
  const { handleUpdate, loading: authLoading } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    const success = await handleUpdate({
      newPassword,
      currentPassword: currentPassword,
    });
    if (success) onHide();
  };
  useEffect(() => {
    if (showPasswordModal) {
      setNewPassword("");
      setNewPasswordError("");
      setCurrentPassword("");
      setCurrentPasswordError("");
      setConfirmPassword("");
      setConfirmPasswordError("");
    }
  }, [showPasswordModal]);

  return (
    <Modal show={showPasswordModal} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Password</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handlePasswordUpdate}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>

            <PasswordInputBox
              password={currentPassword}
              setPassword={setCurrentPassword}
              passwordError={currentPasswordError}
              setPasswordError={setCurrentPasswordError}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>

            <PasswordInputBox
              password={newPassword}
              setPassword={setNewPassword}
              passwordError={newPasswordError}
              setPasswordError={setNewPasswordError}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>

            <PasswordInputBox
              password={confirmPassword}
              setPassword={setConfirmPassword}
              passwordError={confirmPasswordError}
              setPasswordError={setConfirmPasswordError}
            />
          </Form.Group>
          {newPassword !== confirmPassword && (
            <p className="text-danger">New passwords do not match.</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>

          <Button
            variant="primary"
            type="submit"
            disabled={
              newPasswordError ||
              confirmPasswordError ||
              currentPasswordError ||
              newPassword.trim() === "" ||
              confirmPassword.trim() === "" ||
              currentPassword.trim() === "" ||
              newPassword !== confirmPassword ||
              authLoading
            }
          >
            {authLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Update Password"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
EditPasswordModal.propTypes = {
  showPasswordModal: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
export default EditPasswordModal;
