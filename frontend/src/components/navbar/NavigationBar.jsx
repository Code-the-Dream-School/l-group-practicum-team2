import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { HeartFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import logo from "../../assets/PawMatch.png";
import { useAuth } from "../../contexts/AuthContext";
import UserDropdown from "./UserDropdown";
import { SigninButton } from "./SigninButton";

const NavigationBar = () => {
  const { user, logoutUser } = useAuth();

  return (
    <Navbar bg="light" variant="light" fixed="top">
      <Container className="px-3 py-5">
        <Navbar.Brand as={Link} to="/">
          <Image src={logo} alt="PawMatch logo" width={300} />
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
            <SigninButton />
          )}
        </div>
      </Container>
    </Navbar>
  );
};
export default NavigationBar;
