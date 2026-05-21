import React, {useEffect, useRef } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user, loading: authLoading, openLogin, authModal } = useAuth();
    
  const hasOpenedLogin = useRef(false);

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
    return <div> skeleton</div>;
        
       
    }


    
      

    return children;
}
export default ProtectedRoute