import { useState } from "react";
import EditPasswordModal from "./EditPasswordModal";
import { Button } from "react-bootstrap";
const EditPasswordButton = () => {
    const [showPasswordModal, setShowPasswordModal] = useState(false);


    
    return(
        <>
        <EditPasswordModal showPasswordModal={showPasswordModal} onHide={()=>setShowPasswordModal(false)} />
        <Button
            variant="outline-primary"
            size="sm"
            onClick={() => setShowPasswordModal(true)}
          >
            Edit
          </Button>
          </>
    )
}
export default EditPasswordButton