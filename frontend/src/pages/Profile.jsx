import { Card, Form, Button } from "react-bootstrap";

function Profile() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h1 className="mb-2">Account Settings</h1>
      <p className="text-muted mb-4">
        Manage your account information and password settings.
      </p>

      <Card className="p-4 mb-4 shadow-sm">
        <h3 className="mb-3">Profile Information</h3>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>

          <Button variant="primary">Save Profile Changes</Button>
        </Form>
      </Card>

      <Card className="p-4 shadow-sm">
        <h3 className="mb-3">Password & Security</h3>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter current password"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
            />
          </Form.Group>

          <Button variant="primary">Update Password</Button>
        </Form>
      </Card>
    </main>
  );
}

export default Profile;