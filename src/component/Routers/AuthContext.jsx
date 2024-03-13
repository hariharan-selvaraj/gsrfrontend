import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext();

export const AuthProvider = ({children}) => {


    const [isAuthenticate,setIsAuthenticate] =useState(localStorage.getItem('token'));
    
    const [roleType,setRoleType] =useState(localStorage.getItem('roleType'));

    const [projectTransition,setProjectTransition]=useState({
      projectId:"",
      projectTitle:"",
      projectLocation:"",
      projectDescription:"",
      
})
console.log(projectTransition)

    const Authlogin =()=>{
      // setIsAuthenticate(true)
    }
  return (
    <AuthContext.Provider value={{isAuthenticate ,Authlogin,setIsAuthenticate,roleType,setRoleType,projectTransition,setProjectTransition}} >
        {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () =>{
    return useContext(AuthContext);
}