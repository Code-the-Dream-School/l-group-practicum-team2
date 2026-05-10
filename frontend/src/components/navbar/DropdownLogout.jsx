import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const DropdownLogout = ({ onLogout }) => {
  return <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>;
};
export default DropdownLogout;
