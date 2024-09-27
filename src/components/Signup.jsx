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

    fetch("/signup", {
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
          <input
            className="signup-input"
            name="name"
            type="text"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="signup-div">
          <input
            className="signup-input"
            name="memberid"
            type="text"
            placeholder="아이디"
            value={formData.memberid}
            onChange={handleChange}
          />
        </div>
        <div className="signup-div">
          <input
            className="signup-input"
            name="password"
            type="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="signup-div">
          <input
            className="signup-input"
            name="phone"
            type="text"
            placeholder="전화번호"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="signup-div">
          <input
            className="signup-input"
            type="date"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
          />
        </div>
        <Region />
        <div className="signup-signup-div">
          <label className="signup-signup-label">
            <input
              className="signup-signup-input"
              type="radio"
              name="role"
              value="user"
              onChange={handleChange}
            />{" "}
            고객
          </label>
          <label className="signup-signup-label" style={{ marginLeft: "20px" }}>
            <input
              className="signup-signup-input"
              type="radio"
              name="role"
              value="admin"
              onChange={handleChange}
            />{" "}
            관리자
          </label>
        </div>
        <div className="signup-signup-div">
          <label className="signup-signup-label">
            <input
              className="signup-signup-input"
              type="radio"
              name="gender"
              value="남"
              onChange={handleChange}
            />{" "}
            남
          </label>
          <label className="signup-signup-label" style={{ marginLeft: "20px" }}>
            <input
              className="signup-signup-input"
              type="radio"
              name="gender"
              value="여"
              onChange={handleChange}
            />{" "}
            여
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
