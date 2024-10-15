import { useContext, createContext, useState } from "react";
const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const handleLogin = () => {
    setAuth(true);
  };

  const handleLogout = () => {
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{ handleLogin, handleLogout, auth }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
