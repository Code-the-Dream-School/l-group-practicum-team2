import { Dropdown } from "react-bootstrap"
import { Link } from 'react-router-dom'

const DropdownLogout = () => {

    const handleLogout = () => {
        console.log('log out');
    }
    return (
        <Dropdown.Item as={Link} to="/logout" onClick={handleLogout}>Logout</Dropdown.Item>
    )
}
export default DropdownLogout