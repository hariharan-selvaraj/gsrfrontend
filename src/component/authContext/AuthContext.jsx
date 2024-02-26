import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAutheticate, setIsAuthenticate] = useState(true);

  const login = () => {};

  return (
    <AuthContext.Provider value={{ isAutheticate, login }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
