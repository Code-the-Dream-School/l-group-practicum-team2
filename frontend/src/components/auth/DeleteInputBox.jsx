import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const DeleteInputBox = ({
  confirmDelete,
  setConfirmDelete,
  confirmDeleteError,
  setConfirmDeleteError,
}) => {
  const handleChange = (e) => {
    setConfirmDelete(e.target.value);
    if (e.target.value !== "DELETE")
      setConfirmDeleteError(`Please type "DELETE" to confirm`);
    else setConfirmDeleteError("");
  };

  return (
    <Form.Control
      type="text"
      placeholder="DELETE"
      value={confirmDelete}
      onChange={handleChange}
    />
  );
};
DeleteInputBox.propTypes = {
  confirmDelete: PropTypes.string.isRequired,
  setConfirmDelete: PropTypes.func.isRequired,
  confirmDeleteError: PropTypes.string,
  setConfirmDeleteError: PropTypes.func.isRequired,
};
export default DeleteInputBox;
