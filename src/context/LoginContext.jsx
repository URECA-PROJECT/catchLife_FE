import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  const [showSnack, setShowSnack] = useState({
    state: null,
    open: false,
  });
  const [contextUserInfo, setContextUserInfo] = useState({
    name: "",
    track: "",
    color: "",
  });
  const [role, setRole] = useState();

  // 토큰 얻기
  const getInfo = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const expire = JSON.parse(localStorage.getItem("expire"));

    if (!token) return null;
    if (expire <= Date.now()) {
      localStorage.removeItem("token");
      return null;
    }
    return token;
  };

  // 로그아웃
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const token = getInfo();
    setIsLoggedIn(token); // 토큰이 있으면 true, 없으면 false
  }, []);

  return (
    <LoginContext.Provider value={{ handleLogout }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
