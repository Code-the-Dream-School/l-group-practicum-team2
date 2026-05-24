import {useState} from 'react';
import  {useAuth} from '../../contexts/AuthContext'
import InquiryModal from './InquiryModal';

const InquiryButton = ({animalId, animalName}) => {
    const [showInquiryModal, setShowInquiryModal] = useState(false);
    const [inquirySent, setInquirySent] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const { user } = useAuth();

    const handleInquire = () => {
        if (!user) {
        //   navigate("/login");
          return;
        }
    
        setShowInquiryModal(true);
      };
    
      const handleInquirySuccess = () => {
        setShowInquiryModal(false);
        setInquirySent(true);
        setSuccessMessage(
          "Your inquiry has been sent! The shelter will contact you soon."
        );
    
        // Auto-hide toast after 5s
        setTimeout(() => setSuccessMessage(null), 5000);
      };



    return(
        <>
        {successMessage && (
            <div
            className="inquiry-toast inquiry-toast-success"
            role="status"
            aria-live="polite"
            >
            {successMessage}
            </div>
        )}
            <InquiryModal
                show={showInquiryModal}
                onHide={() => setShowInquiryModal(false)}
                animalId={animalId}
                animalName={animalName}
                onSuccess={handleInquirySuccess}
            />
        
    <button
            type="button"
            className="btn btn-primary"
            onClick={handleInquire}
            disabled={inquirySent}
        >
            {inquirySent ? "Inquiry sent ✓" : "I'm Interested"}
        </button>
        </>
        
    )
}
export default InquiryButton