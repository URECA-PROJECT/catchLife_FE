import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      memberid: id,
      password: password,
    };

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.ok) {
          alert("로그인 성공");
          navigate("/"); // 로그인 성공 시 메인 페이지로 이동
          console.log(response);
        } else {
          throw new Error("로그인 실패");
        }
      })
      .catch((error) => {
        alert("로그인 실패: " + error.message);
      });
  };

  return (
    <div className="login-container">
      <h1 className="login-h1">CATCH LIFE</h1>
      <form onSubmit={handleSubmit}>
        <div className="login-div">
          <input
            className="login-input"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디"
          />
        </div>
        <div className="login-div">
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
        </div>
        <div className="login-button-div">
          <button type="submit" className="submit-button">
            로그인
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

export default Login;
