import { useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";
import EditNameButton from "../components/profile/EditNameButton";
import EditPasswordButton from "../components/profile/EditPasswordButton";

function Profile() {
  const { user, handleDelete } = useAuth();
  const { addNotification } = useNotification();

  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deletePassword, setDeletePassword] = useState("");


  const [deleteLoading, setDeleteLoading] = useState(false);


  const [deleteError, setDeleteError] = useState("");



  const isDeleteFormValid =
    deleteConfirmText === "DELETE" && deletePassword.trim();



  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteConfirmText("");
    setDeletePassword("");
  };

  

  

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    if (!deleteConfirmText.trim() || !deletePassword.trim()) {
      setDeleteError("Both fields are required.");
      return;
    }

    if (deleteConfirmText !== "DELETE") {
      setDeleteError('Please type "DELETE" to confirm.');
      return;
    }

    setDeleteError("");
    setDeleteLoading(true);

    const result = await handleDelete(deletePassword);

    setDeleteLoading(false);
  };

  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1 className="mb-2">Account Settings</h1>

      <p className="text-muted mb-4">
        Manage your account information and security settings.
      </p>
      <Card className="p-4 mb-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="mb-1">Email</h5>
            <p className="text-muted mb-0">{user?.email}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 mb-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="mb-1">Name</h5>
            <p className="text-muted mb-0">{user?.name}</p>
          </div>

          <EditNameButton />
        </div>

        <hr />

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">Password</h5>
            <p className="text-muted mb-0">******</p>
          </div>

          <EditPasswordButton />
        </div>
      </Card>

      <Card className="p-4 shadow-sm border-danger">
        <h4 className="text-danger mb-3">Account Management</h4>

        <p className="text-muted">
          Permanently delete your account and all associated data.
        </p>

        <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
          Delete Account
        </Button>
      </Card>

      

      

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
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

              <Form.Control
                type="text"
                placeholder="DELETE"
                value={deleteConfirmText}
                onChange={(e) => {
                  setDeleteConfirmText(e.target.value);
                  setDeleteError("");
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter current password"
                value={deletePassword}
                onChange={(e) => {
                  setDeletePassword(e.target.value);
                  setDeleteError("");
                }}
              />
            </Form.Group>

            {deleteError && <p className="text-danger mt-3">{deleteError}</p>}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>

            <Button
              variant="danger"
              type="submit"
              disabled={!isDeleteFormValid || deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Delete Account"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </main>
  );
}

export default Profile;
