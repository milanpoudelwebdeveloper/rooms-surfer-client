import { createContext, useState } from "react";

const initialState = {
  user: null,
  isLoggedIn: false,
  loginUser: (value) => {},
  logoutUser: () => {},
  updateUser: (value) => {},
};

export const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginUser = (data) => {
    console.log("the coming data is", data);
    setUser(data);
    setIsLoggedIn(true);
  };

  const logoutUser = () => {
    setUser(null);

    setIsLoggedIn(false);
  };

  const updateUser = (updatedInfo) => {
    setUser(updatedInfo);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        loginUser,
        logoutUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
