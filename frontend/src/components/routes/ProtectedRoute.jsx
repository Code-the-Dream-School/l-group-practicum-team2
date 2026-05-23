import React, {useEffect, useRef } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, useLocation } from 'react-router-dom';
import ProfilePlaceholder from '../placeholders/ProfilePlaceholder';
import InquiryPlaceholder from '../placeholders/InquiryPlaceholder';
import FavoritePlaceholder from '../placeholders/AnimalListPlaceholder'

const ProtectedRoute = ({ children }) => {
    const { user, loading: authLoading, openLogin, authModal, logoutClicked } = useAuth();
    const location = useLocation();

    if(!user){
        if (logoutClicked) {
            return <Navigate to="/" replace />;
        }
        switch (location.pathname) {
            case '/profile':
                return <ProfilePlaceholder />;
            case '/favorites':
                return <FavoritePlaceholder />;
         
            case '/inquiry':
                return <InquiryPlaceholder />;

  
            default:
                return null;
        }
        
    
    }

    return children;
}
export default ProtectedRoute