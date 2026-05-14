import { Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { updateUserCredentials } from "../services/authService";


function Profile() {
    const [name, setName] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
  const token = localStorage.getItem("token");

  await updateUserCredentials(
    {
      name,
      currentPassword,
    },
    token
  );

  setSuccess("Profile updated successfully");
} catch (err) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("Something went wrong");
  }
} finally {
  setLoading(false);
}
    };

    const handlePasswordUpdate = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");
  setLoading(true);

  try {
    const token = localStorage.getItem("token");

    await updateUserCredentials(
      {
        newPassword,
        currentPassword,
      },
      token
    );

    setSuccess("Password updated successfully");
    setCurrentPassword("");
    setNewPassword("");
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Something went wrong");
    }
  } finally {
    setLoading(false);
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

          <Button variant="primary" type="submit" disabled={loading}>
             {loading ? "Saving..." : "Save Profile Changes"}
        </Button>
        {success && <p className="text-success mt-3">{success}</p>}

        {error && <p className="text-danger mt-3">{error}</p>}
        </Form>
      </Card>

      <Card className="p-4 shadow-sm">
        <h3 className="mb-3">Password & Security</h3>
        <Form onSubmit={handlePasswordUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
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

          <Button variant="primary">Update Password</Button>
        </Form>
      </Card>
    </main>
  );
}

export default Profile;