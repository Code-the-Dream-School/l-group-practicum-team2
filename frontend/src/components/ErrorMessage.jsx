import PropTypes from "prop-types";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ErrorMessage({
  message,
  handleRetry = null,
  error = false,
}) {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  if (!error || !show) return null;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
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

ErrorMessage.propTypes = {
  message: PropTypes.string,
  handleRetry: PropTypes.func,
  error: PropTypes.bool,
};