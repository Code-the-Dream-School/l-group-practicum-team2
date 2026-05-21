import { Card, Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { updateUserCredentials } from "../services/authService";

function Profile() {
  const [showNameModal, setShowNameModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [name, setName] = useState("");
  const [profilePassword, setProfilePassword] = useState("");

  const [passwordCurrentPassword, setPasswordCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [profileSuccess, setProfileSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const isProfileFormValid = name.trim() && profilePassword.trim();

  const isPasswordFormValid =
    passwordCurrentPassword.trim() &&
    newPassword.trim() &&
    confirmPassword.trim() &&
    newPassword === confirmPassword;

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

const handleProfileUpdate = async (e) => {
  e.preventDefault();

  setProfileError("");
  setProfileSuccess("");
  setProfileLoading(true);

  if (!name.trim() || !profilePassword.trim()) {
    setProfileError("Name and current password are required.");
    setProfileLoading(false);
    return;
  }

  try {
    const token = localStorage.getItem("token");

    await updateUserCredentials(
      {
        name,
        currentPassword: profilePassword,
      },
      token
    );

    setProfileSuccess("Profile updated successfully");
    handleCloseNameModal();
  } catch (err) {
    if (err instanceof Error) {
      setProfileError(err.message);
    } else {
      setProfileError("Something went wrong");
    }
  } finally {
    setProfileLoading(false);
  }
};



  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h1 className="mb-2">Account Settings</h1>

      <p className="text-muted mb-4">
        Manage your account information and security settings.
      </p>

      <Card className="p-4 mb-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="mb-1">Email</h5>
            <p className="text-muted mb-0">user@example.com</p>
          </div>

          <Button variant="outline-primary" size="sm">
            Edit
          </Button>
        </div>

        <hr />

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="mb-1">Name</h5>
            <p className="text-muted mb-0">John Doe</p>
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
        <h4 className="text-danger mb-3">Danger Zone</h4>

        <p className="text-muted">
          Permanently delete your account and all associated data.
        </p>

        <Button variant="danger">Delete Account</Button>
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
          
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNameModal(false)}>
            Cancel
          </Button>

          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
        </Form>
      </Modal>
      <Modal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
      >
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
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPasswordModal(false)}
          >
            Cancel
          </Button>

          <Button variant="primary">Update Password</Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </main>
  );
<Form.Group className="mb-3">
  <Form.Label>Confirm New Password</Form.Label>

  <Form.Control
    type="password"
    placeholder="Confirm new password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
  />
</Form.Group>

}

export default Profile;
