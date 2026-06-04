import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { HeartFill, HouseFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import logo from "../../assets/PawMatch.png";
import { useAuth } from "../../contexts/AuthContext";
import UserDropdown from "./UserDropdown";
import { SigninButton } from "./SigninButton";
import { useLocation } from "react-router-dom";
import CollapsibleMenu from "./CollapsibleMenu";

const NavigationBar = () => {
  const { user, logoutUser, openLogin } = useAuth();

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
      sticky="top"
    >
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
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="w-100 d-none d-lg-flex flex-row justify-content-between">
            <div className="fs-4 gap-2">
              <Nav.Link as={Link} to="/">
                <HouseFill size={25} className="me-2" /> Home
              </Nav.Link>
            </div>
            <div className="d-flex flex-row gap-2">
              {user ? (
                <>
                  <Button
                    as={Link}
                    to="/favorites"
                    variant="danger"
                    className="px-4 py-2 fs-5"
                    style={{ borderRadius: "0.5rem", height: "3rem" }}
                  >
                    <HeartFill size={25} className="me-3" />
                    <span className="fs-5">Favorites</span>
                  </Button>
                  <UserDropdown
                    user={user}
                    onLogout={() => logoutUser(true, location.pathname)}
                  />
                </>
              ) : (
                <SigninButton />
              )}
            </div>
          </Nav>

          <CollapsibleMenu
            user={user}
            onLogout={logoutUser}
            openLogin={openLogin}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
