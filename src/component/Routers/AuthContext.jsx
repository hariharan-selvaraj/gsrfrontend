import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isAuthenticate,setIsAuthenticate] =useState( true);
    const Authlogin =()=>{
        
    }
  return (
    <AuthContext.Provider value={{isAuthenticate ,Authlogin}} >
        {children}
    </AuthContext.Provider>
  )
}

// e AuthProvider

export const useAuth = () =>{
    return useContext(AuthContext);
}