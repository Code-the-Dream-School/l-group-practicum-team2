import { useState } from "react";
import EditNameModal from "./EditNameModal";
import { Button } from "react-bootstrap";
const EditNameButton = () => {
  const [showNameModal, setShowNameModal] = useState(false);

  return (
    <>
      <EditNameModal
        showNameModal={showNameModal}
        onHide={() => setShowNameModal(false)}
      />
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => setShowNameModal(true)}
      >
        Edit
      </Button>
    </>
  );
};
export default EditNameButton;
