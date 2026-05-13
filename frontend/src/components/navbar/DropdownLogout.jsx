import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";

const DropdownLogout = ({ onLogout }) => {
  return <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>;
};

DropdownLogout.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default DropdownLogout;

