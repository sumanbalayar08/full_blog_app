import { createContext,useState,useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [token, setAuthToken] = useState(null);

  // Function to login and set token
  const login = (token) => {
    localStorage.setItem('token', token);
    setAuthToken(token);
  };

  // Function to logout and remove token
  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  // Load the token from storage on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};


export default UserContext;