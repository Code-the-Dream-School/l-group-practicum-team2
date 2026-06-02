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
    <Navbar bg="light" variant="light" expand="lg" fixed="top">
      <Container className="px-3 py-4">
        <Navbar.Brand as={Link} to="/" className="me-3">
          <Image
            src={logo}
            alt="PawMatch logo"
            className="navbar-logo"
            width={300}
          />
          <div className="mt-3">Find your perfect companion</div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-3">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            {user ? (
              <>
                <Button
                  as={Link}
                  to="/favorites"
                  variant="danger"
                  className="px-4 py-2 fs-5"
                >
                  <HeartFill size={25} className="me-3" />
                  <span className="fs-5">Favorites</span>
                </Button>
                <UserDropdown user={user} onLogout={logoutUser} />
              </>
            ) : (
              <SigninButton />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
