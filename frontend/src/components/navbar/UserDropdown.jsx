import { DropdownButton, Dropdown } from "react-bootstrap"
import { PersonFill } from "react-bootstrap-icons"
import { Link } from "react-router-dom"
import DropdownLogout from "./DropdownLogout"
const UserDropdown = ({user}) => {
  
  
    return (
        
        <DropdownButton
          id="dropdown-button-drop"
          size="lg"
          title={
            <>
              <PersonFill size={25} className="me-3" />
              <span className="fs-5">{user?.name}</span>
            </>
          }
        >
          <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
          <Dropdown.Item as={Link} to="/favorites">Favorites</Dropdown.Item>
          <Dropdown.Item as={Link} to="/inquiries">Inquireis</Dropdown.Item>
          <Dropdown.Divider />
          <DropdownLogout />
        </DropdownButton>
    )
}
export default UserDropdown