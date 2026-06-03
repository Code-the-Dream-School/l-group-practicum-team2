import { Nav } from "react-bootstrap";
import { HeartFill, PersonFill, HouseFill, EnvelopeHeartFill, BoxArrowRight  } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
const CollapsibleMenu = ({user, onLogout, openLogin}) => {

    return (
        <Nav className="d-lg-none flex-column align-items-center text-center">
            { user ? 
            <>
                <Nav.Link href="/">
                    <HouseFill size={25} className="me-1" />
                    Home
                </Nav.Link>
                <Nav.Link href="/profile">
                    <PersonFill size={25} className="me-1" />
                    Profile
                </Nav.Link>
                <Nav.Link href="/favorites">
                    <HeartFill size={25} className="me-1" />
                    Favorites
                </Nav.Link>
                
                <Nav.Link href="/profile/inquiries">
                    <EnvelopeHeartFill size={25} className="me-1" />
                    Inquiries
                </Nav.Link>
                <Nav.Link 
                    href="#"
                    onClick={
                        (e) => {
                        e.preventDefault();
                        onLogout()
                    }}
                >
                    <BoxArrowRight size={25} className="me-1" />
                    Logout
                </Nav.Link>
            </>
            : 
            <Nav.Link 
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    openLogin();
                }}
            >
                Sign in
            </Nav.Link>
            }
            
          </Nav>
    )
}
export default CollapsibleMenu