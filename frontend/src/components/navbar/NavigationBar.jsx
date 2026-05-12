import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { HeartFill, PersonFill } from "react-bootstrap-icons";
import UserDropdown from "./UserDropdown";
import logo from "../../assets/PawMatch.png";
import { useAuth } from "../../context/authContext";

const NavigationBar = () => {
  const {
    user,
    // logoutUser
  } = useAuth();

  const logoutUser = () => console.log("logout"); // temporary

  return (
    <Navbar bg="light" variant="light">
      <Container className="px-3 py-5">
        <Navbar.Brand as={Link} to="/">
          <Image src={logo} alt="Logo" width={300} />
          <div className="mt-3">Find your perfect companion</div>
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
        </Nav>

        <div>
          {user ? (
            <div style={{ display: "flex" }}>
              <Button
                as={Link}
                to="/favorites"
                variant="danger"
                className="px-4 py-2 me-3 fs-5"
              >
                <HeartFill size={25} className="me-3" />
                <span className="fs-5">Favorites</span>
              </Button>
              <UserDropdown user={user} onLogout={logoutUser} />
            </div>
          ) : (
            <Button
              as={Link}
              to="/login"
              variant="primary"
              className="px-4 py-2"
            >
              <PersonFill size={25} className="me-1" />
              <span className="fs-5">Sign in</span>
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
};
export default NavigationBar;
