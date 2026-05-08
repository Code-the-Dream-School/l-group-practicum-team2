import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Button from "react-bootstrap/Button";

export default function ErrorMessage({
  message,
  handleRetry = null,
  error = false,
}) {
  const [show, setShow] = useState(error ? true : false);

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
          {handleRetry ? (
            <Button
              variant="primary"
              onClick={() => {
                handleClose();
                handleRetry();
              }}
            >
              Retry
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
