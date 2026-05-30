import { useState } from "react";
import { useInquiry } from "../../contexts/InquiryContext";
import InquiryModal from "./InquiryModal";
import { Spinner } from "react-bootstrap";

const InquiryButton = ({ animalId, animalName }) => {
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const { requestAddInquiry, addInquiryLoading } = useInquiry();

  const handleInquire = () => {
    setShowInquiryModal(true);
  };

  return (
    <>
      <InquiryModal
        show={showInquiryModal}
        onHide={() => setShowInquiryModal(false)}
        animalId={animalId}
        animalName={animalName}
        isSubmitting={addInquiryLoading}
        requestAddInquiry={requestAddInquiry}
      />

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleInquire}
        disabled={addInquiryLoading}
        style={{ width: "8rem" }}
      >
        {addInquiryLoading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          "I'm interested"
        )}
      </button>
    </>
  );
};
export default InquiryButton;
