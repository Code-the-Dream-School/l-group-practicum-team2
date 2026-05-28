import { useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";

function Profile() {
  const { user, handleUpdate, handleDelete } = useAuth();
  const { addNotification } = useNotification();
  const [showNameModal, setShowNameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [name, setName] = useState("");
  const [profilePassword, setProfilePassword] = useState("");

  const [passwordCurrentPassword, setPasswordCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deletePassword, setDeletePassword] = useState("");

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isProfileFormValid = name.trim() && profilePassword.trim();

  const isPasswordFormValid =
    passwordCurrentPassword.trim() &&
    newPassword.trim() &&
    confirmPassword.trim() &&
    newPassword === confirmPassword;

  const isDeleteFormValid =
    deleteConfirmText === "DELETE" && deletePassword.trim();

  const handleCloseNameModal = () => {
    setShowNameModal(false);
    setName("");
    setProfilePassword("");
    setProfileError("");
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteConfirmText("");
    setDeletePassword("");
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    setProfileError("");
    setProfileLoading(true);

    try {
      const success = await handleUpdate({
        name,
        currentPassword: profilePassword,
      });

      if (!success) {
        setProfileError("Profile update failed.");
        addNotification("danger", "Profile update failed.");
        return;
      }

      addNotification("success", "Profile updated successfully");
      handleCloseNameModal();
    } catch (err) {
      setProfileError(err.message || "Something went wrong");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    setPasswordError("");
    setPasswordLoading(true);

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      setPasswordLoading(false);
      return;
    }

    try {
      const success = await handleUpdate({
        newPassword,
        currentPassword: passwordCurrentPassword,
      });

      if (!success) {
        setPasswordError("Password update failed.");
        addNotification("danger", "Password update failed.");
        return;
      }

      addNotification("success", "Password updated successfully");
      handleClosePasswordModal();
    } catch (err) {
      setPasswordError(err.message || "Something went wrong");
    } finally {
      setPasswordLoading(false);
    }
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

    if (!result.success) {
      setDeleteLoading(false);
      return;
    }

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

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="mb-1">Email</h5>
            <p className="text-muted mb-0">user@example.com</p>
          </div>

          <Button variant="outline-primary" size="sm">
            Edit
          </Button>
        </div>
      </Card>

      <Card className="p-4 mb-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="mb-1">Name</h5>
            <p className="text-muted mb-0">{user?.name}</p>
          </div>

          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => setShowNameModal(true)}
          >
            Edit
          </Button>
        </div>

        <hr />

        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1">Password</h5>
            <p className="text-muted mb-0">******</p>
          </div>

          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => setShowPasswordModal(true)}
          >
            Edit
          </Button>
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

      <Modal show={showNameModal} onHide={handleCloseNameModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Name</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleProfileUpdate}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>New Name</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter new name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter current password"
                value={profilePassword}
                onChange={(e) => setProfilePassword(e.target.value)}
              />
            </Form.Group>

            {profileError && <p className="text-danger mt-3">{profileError}</p>}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseNameModal}>
              Cancel
            </Button>

            <Button
              variant="primary"
              type="submit"
              disabled={!isProfileFormValid || profileLoading}
            >
              {profileLoading ? "Saving..." : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showPasswordModal} onHide={handleClosePasswordModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Password</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handlePasswordUpdate}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Current Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter current password"
                value={passwordCurrentPassword}
                onChange={(e) => setPasswordCurrentPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            {passwordError && <p className="text-danger">{passwordError}</p>}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePasswordModal}>
              Cancel
            </Button>

            <Button
              variant="primary"
              type="submit"
              disabled={!isPasswordFormValid || passwordLoading}
            >
              {passwordLoading ? "Updating..." : "Update Password"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

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
