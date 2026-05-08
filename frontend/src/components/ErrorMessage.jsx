import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Button from "react-bootstrap/Button";

export default function ErrorMessage({ message, handleRetry }) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>An error has occurred</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              handleRetry();
            }}
          >
            Retry
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
