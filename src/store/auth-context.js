import React, {useState} from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpTime = new Date(expirationTime).getTime()
  const remainingTime = adjExpTime - currentTime;
  return remainingTime
}

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token')
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  }
const loginHandler = (token, exirationTime) => {
  setToken(token);
  localStorage.setItem("token", token);
  const remainingTime = calculateRemainingTime(exirationTime);
};
  const contextValue = {
    taken: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  }

  return <AuthContextProvider value={contextValue}>{props.children}</AuthContextProvider>;
};

export default AuthContext;
