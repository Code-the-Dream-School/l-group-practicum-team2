import PasswordInputBox from "../auth/PasswordInputBox";
import DeleteInputBox from "../auth/DeleteInputBox";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { Form, Modal, Button, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
const DeleteAccountModal = ({ showDeleteModal, onHide }) => {
  const { loading: authLoading, handleDelete } = useAuth();

  const [confirmDelete, setConfirmDelete] = useState("");
  const [confirmDeleteError, setConfirmDeleteError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    const success = await handleDelete(currentPassword);

    if (success) handleClose();
  };

  const handleClose = () => {
    setConfirmDelete("");
    setConfirmDeleteError("");
    setCurrentPassword("");
    setCurrentPasswordError("");
    onHide();
  };

  return (
    <Modal show={showDeleteModal} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Account</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleDeleteAccount}>
        <Modal.Body>
          <p className="text-danger fw-semibold">
            This action is permanent and cannot be undone.
          </p>

          <p className="text-muted">
            To confirm, please type DELETE and enter your current password.
          </p>

          <Form.Group className="mb-3">
            <Form.Label>Type DELETE to confirm</Form.Label>

            <DeleteInputBox
              confirmDelete={confirmDelete}
              setConfirmDelete={setConfirmDelete}
              confirmDeleteError={confirmDeleteError}
              setConfirmDeleteError={setConfirmDeleteError}
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
            variant="danger"
            type="submit"
            disabled={
              currentPasswordError ||
              confirmDeleteError ||
              currentPassword.trim() === "" ||
              confirmDelete.trim() === "" ||
              authLoading
            }
          >
            {authLoading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Delete Account"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
DeleteAccountModal.propTypes = {
  showDeleteModal: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
export default DeleteAccountModal;
