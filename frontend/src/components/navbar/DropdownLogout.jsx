import { Dropdown } from "react-bootstrap";

const DropdownLogout = ({ onLogout }) => {
  return <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>;
};
export default DropdownLogout;
