import React from 'react'
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';
const PrivateRoutes = ({children}) => {

    const { isAutheticate } = useAuth();
    if(!isAutheticate){
        console.log("authenticate")
        return <Navigate to="/" replace />
    }


  return children
}

export default PrivateRoutes