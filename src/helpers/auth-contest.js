"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

// Create the context
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogIn: () => {},
  onLogout: () => {},
});

// Provide the context to components
export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const onLogIn = () => {
    setLoggedIn(true);
  };

  const onLogout = () => {
    setLoggedIn(false);
    Cookies.remove("token"); // Optional: remove cookie on logout
  };

  useEffect(() => {
    const userLoggedIn = Cookies.get("token");
    if (userLoggedIn) {
      onLogIn();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, onLogIn, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
