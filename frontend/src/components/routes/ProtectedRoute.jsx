import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import ProfilePlaceholder from "../placeholders/ProfilePlaceholder";
import InquiryPlaceholder from "../placeholders/InquiryPlaceholder";
import FavoritePlaceholder from "../placeholders/AnimalListPlaceholder";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { user, logoutClicked, setLogoutClicked } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (logoutClicked) {
      navigate("/", { replace: true });
    }
    return () => {
      if (logoutClicked) {
        setLogoutClicked(false);
      }
    };
  }, [logoutClicked, navigate, setLogoutClicked]);

  if (!user) {
    switch (location.pathname) {
      case "/profile":
        return <ProfilePlaceholder />;
      case "/favorites":
        return <FavoritePlaceholder />;

      case "/profile/inquiries":
        return <InquiryPlaceholder />;

      default:
        return null;
    }
  }

  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
