import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Signup.css";
import Region from "../components/Main/Region";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    memberid: "",
    password: "",
    phone: "",
    birth: "",
    gender: "",
    address: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("회원가입이 완료되었습니다.");
          navigate("/"); // 회원가입 후 메인 페이지로 이동
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login-container">
      <h1 className="signup-h1">CATCH LIFE</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-div">
          <label htmlFor="name" className="signup-label">성함</label>
          <input
            className="signup-input"
            id="name"
            name="name"
            type="text"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="signup-div">
          <label htmlFor="memberid" className="signup-label">아이디</label>
          <input
            className="signup-input"
            id="memberid"
            name="memberid"
            type="text"
            placeholder="아이디"
            value={formData.memberid}
            onChange={handleChange}
          />
        </div>
        <div className="signup-div">
          <label htmlFor="password" className="signup-label">비밀번호</label>
          <input
            className="signup-input"
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="signup-div">
          <label htmlFor="phone" className="signup-label">전화번호</label>
          <input
            className="signup-input"
            id="phone"
            name="phone"
            type="text"
            placeholder="전화번호"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="signup-div">
          <label htmlFor="birth" className="signup-label">생년월일</label>
          <input
            className="signup-input"
            id="birth"
            name="birth"
            type="date"
            value={formData.birth}
            onChange={handleChange}
          />
        </div>
        <div className="signup-div">
          <label className="signup-label">관심지역</label>
          <Region />
        </div>
        <div className="signup-signup-div">
          <label className="signup-signup-label">
            <input
              className="signup-signup-input"
              type="radio"
              name="role"
              value="user"
              onChange={handleChange}
            />{" "}
            소비자
          </label>
          <label className="signup-signup-label" style={{ marginLeft: "20px" }}>
            <input
              className="signup-signup-input"
              type="radio"
              name="role"
              value="admin"
              onChange={handleChange}
            />{" "}
            사업자
          </label>
        </div>
        <div className="signup-button-div">
          <button type="submit" className="submit-button">
            회원가입
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/")}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
