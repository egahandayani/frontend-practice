import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  // Check for token in localStorage when component mounts
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("access_token", token);
    setIsLogin(true);
  };

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem("access_token");
    // Update login state
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
