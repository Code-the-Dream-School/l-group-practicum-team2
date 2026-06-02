import { Nav } from "react-bootstrap";
import { HeartFill, PersonFill, HouseFill, EnvelopeHeartFill, BoxArrowRight  } from "react-bootstrap-icons";
import { useAuth } from "../../contexts/AuthContext";
const CollapsibleMenu = ({user, onLogout}) => {
    const { openLogin } = useAuth();
    return (
        <Nav className="flex-column align-items-center text-center gap-3 py-3 w-100">
            <Nav.Link to="/">
                <HouseFill size={25} className="me-1" />
                Home
            </Nav.Link>
            {
                user ?
                <>
                    <Nav.Link  to="/profile">
                        <PersonFill size={25} className="me-1" />
                        Profile
                    </Nav.Link >
                    <Nav.Link to="/favorites">
                        <HeartFill size={25} className="me-1" />
                        <span>Favorites</span>
                    </Nav.Link >
                    <Nav.Link  to="/profile/inquiries">
                        <EnvelopeHeartFill size={25} className="me-1" />
                        Inquiries
                    </Nav.Link >
                    <Nav.Link onClick={onLogout}>
                        <BoxArrowRight size={25} className="me-1" />
                        Logout
                        </Nav.Link>
                </>
                : 
                
                <Nav.Link onClick={() => openLogin()} >
                    <PersonFill size={25} className="me-1" />
                    <span>Sign in</span>
                    
                </Nav.Link>
                }
            
        </Nav>
    )
}
export default CollapsibleMenu