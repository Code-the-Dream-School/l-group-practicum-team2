import { useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal";
import { Button } from "react-bootstrap";
const DeleteAccountButton = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <>
      <DeleteAccountModal
        showDeleteModal={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      />
      <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
        Delete Account
      </Button>
    </>
  );
};
export default DeleteAccountButton;
