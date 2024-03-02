import React from 'react'
import { useAuth } from './AuthContext'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {isAuthenticate} = useAuth();
    if(!isAuthenticate){
        return <Navigate to="/login" replace />
    }
  return children;
}

export default PrivateRoute