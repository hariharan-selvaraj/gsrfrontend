import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isAuthenticate,setIsAuthenticate] =useState(true);
    const Authlogin =()=>{
      setIsAuthenticate(true)
    }
  return (
    <AuthContext.Provider value={{isAuthenticate ,Authlogin,setIsAuthenticate}} >
        {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () =>{
    return useContext(AuthContext);
}