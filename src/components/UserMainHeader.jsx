import React from "react";
import "../css/Main.css";
import { useNavigate } from "react-router-dom";

const UserMainHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="headerTitle">
      <button
        className="backBtn"
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
      <div>{title}</div>
    </div>
  );
};

export default UserMainHeader;
