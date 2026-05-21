import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { updateUserCredentials } from "../services/authService";

function Profile() {
  const { handleDelete } = useAuth();

  const [name, setName] = useState("");
  const [profilePassword, setProfilePassword] = useState("");

  const [passwordCurrentPassword, setPasswordCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [deletePassword, setDeletePassword] = useState("");

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [profileSuccess, setProfileSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    setProfileError("");
    setProfileSuccess("");
    setProfileLoading(true);

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

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    setPasswordError("");
    setPasswordSuccess("");
    setPasswordLoading(true);

    try {
      const token = localStorage.getItem("token");

      await updateUserCredentials(
        {
          newPassword,
          currentPassword: passwordCurrentPassword,
        },
        token
      );

      setPasswordSuccess("Password updated successfully");
      setPasswordCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      if (err instanceof Error) {
        setPasswordError(err.message);
      } else {
        setPasswordError("Something went wrong");
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    setDeleteError("");
    setDeleteLoading(true);

    try {
      const result = await handleDelete(deletePassword);

      if (!result.success) {
        setDeleteError(result.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        setDeleteError(err.message);
      } else {
        setDeleteError("Something went wrong");
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h1 className="mb-2">Account Settings</h1>
      <p className="text-muted mb-4">
        Manage your account information and password settings.
      </p>

      <Card className="p-4 mb-4 shadow-sm">
        <h3 className="mb-3">Profile Information</h3>
        <Form onSubmit={handleProfileUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
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

          <Button variant="primary" type="submit" disabled={profileLoading}>
            {profileLoading ? "Saving..." : "Save Profile Changes"}
          </Button>

          {profileSuccess && (
            <p className="text-success mt-3">{profileSuccess}</p>
          )}

          {profileError && <p className="text-danger mt-3">{profileError}</p>}
        </Form>
      </Card>

      <Card className="p-4 mb-4 shadow-sm">
        <h3 className="mb-3">Password & Security</h3>
        <Form onSubmit={handlePasswordUpdate}>
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

          <Button variant="primary" type="submit" disabled={passwordLoading}>
            {passwordLoading ? "Updating..." : "Update Password"}
          </Button>

          {passwordSuccess && (
            <p className="text-success mt-3">{passwordSuccess}</p>
          )}

          {passwordError && <p className="text-danger mt-3">{passwordError}</p>}
        </Form>
      </Card>

      <Card className="p-4 shadow-sm border-danger">
        <h3 className="mb-3 text-danger">Delete Account</h3>
        <p className="text-muted">
          Permanently delete your account. This action cannot be undone.
        </p>

        <Form onSubmit={handleDeleteAccount}>
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter current password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="danger" type="submit" disabled={deleteLoading}>
            {deleteLoading ? "Deleting..." : "Delete Account"}
          </Button>

          {deleteError && <p className="text-danger mt-3">{deleteError}</p>}
        </Form>
      </Card>
    </main>
  );
}

export default Profile;
