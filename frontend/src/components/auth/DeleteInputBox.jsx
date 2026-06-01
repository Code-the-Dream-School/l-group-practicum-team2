import { Form } from "react-bootstrap";
const DeleteInputBox = ({
  confirmDelete,
  setConfirmDelete,
  confirmDeleteError,
  setConfirmDeleteError,
}) => {
  const validateConfirmDelete = (value) => {
    if (value === "") {
      setConfirmDeleteError("Confirmation text is required");
    } else if (value !== "DELETE") {
      setConfirmDeleteError('Please type "DELETE" to confirm');
    } else {
      setConfirmDeleteError("");
    }
  };
  const handleChange = (e) => {
    setConfirmDelete(e.target.value);
    if (confirmDeleteError) {
      validateConfirmDelete(e.target.value);
    }
  };

  return (
    <>
      <Form.Control
        type="text"
        placeholder="DELETE"
        value={confirmDelete}
        onChange={handleChange}
        onBlur={(e) => validateConfirmDelete(e.target.value)}
      />
      {confirmDeleteError && (
        <p className="text-danger">{confirmDeleteError}.</p>
      )}
    </>
  );
};

export default DeleteInputBox;
