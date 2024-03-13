import React from 'react'
import { useAuth } from './AuthContext'
import { Navigate } from 'react-router-dom';
import PageNotFound from '../PageNotFound';

const PrivateRoute = ({children, allowedRoles}) => {
    const {isAuthenticate,roleType} = useAuth();
    console.log("---",allowedRoles, roleType)
   
    console.log("roleTYpe",roleType)
    if(!isAuthenticate){
        return <Navigate to="/" replace />
    }
    if (allowedRoles =='telecom' && roleType ==1){
      return children
    }
   
    if (allowedRoles =='admin' && roleType ==0){
      return children
    }
  
    if (allowedRoles =='accountant' && roleType ==2){
      return children
    }
      return <PageNotFound />
  
 
}

export default PrivateRoute

