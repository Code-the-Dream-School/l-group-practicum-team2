import { useState } from "react";
import { Button, Card, Form, Modal, Spinner } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useNotification } from "../contexts/NotificationContext";
import EditNameButton from "../components/profile/EditNameButton";
import EditPasswordButton from "../components/profile/EditPasswordButton";
import DeleteAccountButton from "../components/profile/DeleteAccountButton";

function Profile() {
  const { user, handleUpdate, handleDelete, loading: authLoading } = useAuth();
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

  const [passwordError, setPasswordError] = useState("");
  const [deleteError, setDeleteError] = useState("");

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

    setProfileLoading(true);

    try {
      const success = await handleUpdate({
        name,
        currentPassword: profilePassword,
      });

      if (!success) {
        addNotification("danger", "Profile update failed.");
        return;
      }

      addNotification("success", "Profile updated successfully");
      handleCloseNameModal();
    } catch (err) {
      addNotification("danger", err.message || "Something went wrong");
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
        addNotification("danger", "Password update failed.");
        return;
      }

      addNotification("success", "Password updated successfully");
      handleClosePasswordModal();
    } catch (err) {
      addNotification("danger", err.message || "Something went wrong");
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
      <title>Account Settings - PawMatch</title>

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
