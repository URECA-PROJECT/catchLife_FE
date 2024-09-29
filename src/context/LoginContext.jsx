import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [member, setMember] = useState({
    id: "",
    name: "",
    phone: "",
    region: 0,
    role: "",
  });

  // 회원가입 폼
  const [formData, setFormData] = useState({
    name: "",
    memberid: "",
    password: "",
    phone: "",
    birth: "",
    gender: "",
    address: "",
    regino: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 회원가입
  const handleSignup = (e) => {
    e.preventDefault();

    console.log(formData);

    API.post(`/signup`, formData)
      .then((response) => {
        if (response.status === 200) {
          alert("회원가입이 완료되었습니다.");
          navigate("/login"); // 회원가입 후 메인 페이지로 이동

          setFormData({
            name: "",
            memberid: "",
            password: "",
            phone: "",
            birth: "",
            gender: "",
            address: "",
            regino: "",
            role: "",
          });
        } else {
          alert("정보를 다시 확인해주세요.");
        }
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };

  // 로그인
  const handleLogin = (e) => {
    e.preventDefault();

    const loginData = {
      memberid: id,
      password: password,
    };

    API.post(`/login`, loginData)
      .then((response) => {
        const member = response.data.data;
        console.log("회원정보", member);
        localStorage.setItem("id", member.id);
        localStorage.setItem("name", member.name);
        localStorage.setItem("phone", member.phone);
        localStorage.setItem("role", member.role);
        localStorage.setItem("regionId", member.region);

        setMember({
          id: member.id,
          name: member.name,
          phone: member.phone,
          region: member.region,
          role: member.role,
        });

        setId("");
        setPassword("");

        alert(`${member.name}님 환영합니다.`);
        setIsLoggedIn(true);
        navigate("/"); // 회원가입 후 메인 페이지로 이동
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };

  // 로그아웃
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("name")));
  }, []);

  return (
    <LoginContext.Provider
      value={{
        handleLogout,
        handleChange,
        handleSignup,
        formData,
        setFormData,
        id,
        setId,
        password,
        setPassword,
        handleLogin,
        isLoggedIn,
        setIsLoggedIn,
        member,
        setMember,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
