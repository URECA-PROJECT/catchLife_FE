import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import { useLogin } from "../context/LoginContext";

function Login() {
  const navigate = useNavigate();
  const { id, password, setId, setPassword, handleLogin } = useLogin();

  return (
    <div className="login-container">
      <h1 className="login-h1">CATCH LIFE</h1>
      <form onSubmit={handleLogin}>
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
