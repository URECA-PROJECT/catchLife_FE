import React from "react";
import "../css/Main.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const UserMainHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="headerTitle">
      <FaArrowLeftLong
        size={18}
        className="backBtn"
        onClick={() => {
          navigate(-1);
        }}
      />
      <div>{title}</div>
    </div>
  );
};

export default UserMainHeader;
