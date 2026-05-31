import { Form } from "react-bootstrap";
const DeleteInputBox = ({
    confirmDelete, 
    setConfirmDelete, 
    confirmDeleteError, 
    setConfirmDeleteError
}) => {
    

    const handleChange = (e) => {
        setConfirmDelete(e.target.value);
        if(e.target.value !== "DELETE")
            setConfirmDeleteError(`Please type "DELETE" to confirm`)
        else
            setConfirmDeleteError("")
    }

    return(
        <Form.Control
            type="text"
            placeholder="DELETE"
            value={confirmDelete}
            onChange={handleChange}
                
        />
    )
}
export default DeleteInputBox;