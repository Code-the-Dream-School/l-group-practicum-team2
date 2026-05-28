import {useState} from 'react';
import  {useAuth} from '../../contexts/AuthContext'
import { useInquiry } from '../../contexts/InquiryContext';
import InquiryModal from './InquiryModal';
import { Spinner } from 'react-bootstrap';

const InquiryButton = ({animalId, animalName}) => {
    const [showInquiryModal, setShowInquiryModal] = useState(false);
    const { user, loading:authLoading } = useAuth();
    const { requestAddInquiry, loading:inquiryLoading } = useInquiry();
   
    const handleInquire = () => {
        setShowInquiryModal(true);
    };

    return(
        <>
            <InquiryModal
                show={showInquiryModal}
                onHide={() => setShowInquiryModal(false)}
                animalId={animalId}
                animalName={animalName}
                isSubmitting={authLoading || inquiryLoading}
                requestAddInquiry={requestAddInquiry}
            />
            
            <button
                type="button"
                className="btn btn-primary"
                onClick={handleInquire}
                disabled={authLoading || inquiryLoading }
                style={{ width: "8rem" }}

            >
                {authLoading || inquiryLoading ? <Spinner animation="border" size="sm" /> : "I'm interested"}
            </button>
        </>
        
    )
}
export default InquiryButton