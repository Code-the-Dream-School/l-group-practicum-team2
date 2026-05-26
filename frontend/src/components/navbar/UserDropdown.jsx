import { DropdownButton, Dropdown } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import DropdownLogout from "./DropdownLogout";
import PropTypes from "prop-types";

const UserDropdown = ({ user, onLogout }) => {
  return (
    <DropdownButton
      id="dropdown-button-drop"
      size="lg"
      title={
        <>
          <PersonFill size={25} className="me-3" />
          <span className="fs-5">{user.name}</span>
        </>
      }
    >
      <Dropdown.Item as={Link} to="/profile">
        Profile
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/favorites">
        Favorites
      </Dropdown.Item>
      <Dropdown.Item as={Link} to="/profile/inquiries">
        Inquiries
      </Dropdown.Item>
      <Dropdown.Divider />
      <DropdownLogout onLogout={onLogout} />
    </DropdownButton>
  );
};
UserDropdown.propTypes = {
  user: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,

  onLogout: PropTypes.func.isRequired,
};
export default UserDropdown;
