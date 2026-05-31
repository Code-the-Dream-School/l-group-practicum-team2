import { useState } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";
import EditNameButton from "../components/profile/EditNameButton";
import EditPasswordButton from "../components/profile/EditPasswordButton";
import DeleteAccountButton from "../components/profile/DeleteAccountButton";

function Profile() {
  const { user } = useAuth();

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
        <h4 className="text-danger mb-3">Danger Zone</h4>

        <p className="text-muted">
          Permanently delete your account and all associated data.
        </p>

        <DeleteAccountButton />
      </Card>
    </main>
  );
}

export default Profile;
