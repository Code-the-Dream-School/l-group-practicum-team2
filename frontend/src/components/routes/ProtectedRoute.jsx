import React, {useEffect, useRef } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, useLocation } from 'react-router-dom';
import ProfilePlaceholder from '../placeholders/ProfilePlaceholder';
import InquiryPlaceholder from '../placeholders/InquiryPlaceholder';
import FavoritePlaceholder from '../placeholders/AnimalListPlaceholder'
const ProtectedRoute = ({ children }) => {
    const { user, loading: authLoading, openLogin, authModal } = useAuth();
    const location = useLocation();
  const hasOpenedLogin = useRef(false);

console.log(location)
  
    useEffect(()=>{
        console.log("authLoading", authLoading, 'user',user, 'authModal', authModal, 'hasOpenedLogin', hasOpenedLogin)
        if(!authLoading && !user && !authModal && !hasOpenedLogin.current){
            hasOpenedLogin.current = true;
            openLogin();
            
        }
    
    }, [authLoading, user, authModal])

    if(!user){
        if (hasOpenedLogin.current && authModal === null) {
            return <Navigate to="/" replace />
        }
        switch (location.pathname) {
            case '/profile':
                return <ProfilePlaceholder />;
            case '/favorites':
                return <FavoritePlaceholder />;
         
            case '/inquiry':
                return <InquiryPlaceholder />;

  
    default:
        break;
  }
        
    
    }

    return children;
}
export default ProtectedRoute