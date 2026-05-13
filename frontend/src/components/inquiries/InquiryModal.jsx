import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import InquiryForm from "./InquiryForm";

function InquiryModal({ show, onHide, animalId, animalName, onSuccess }) {
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          {animalName ? `Inquire about ${animalName}` : "Send an inquiry"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <InquiryForm
          animalId={animalId}
          onSuccess={onSuccess}
          onCancel={onHide}
        />
      </Modal.Body>
    </Modal>
  );
}

InquiryModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  animalId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  animalName: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
};

export default InquiryModal;
