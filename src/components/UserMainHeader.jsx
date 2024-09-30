import React from "react";
import "../css/Main.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const UserMainHeader = ({ center, right }) => {
  const navigate = useNavigate();

  return (
    <div className="headerTitle border">
      <FaArrowLeftLong
        size={18}
        className="backBtn"
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className="flex flex-col text-center">
        <div className="text-lg">{center}</div>
        <div className="text-xs">{right}</div>
      </div>
    </div>
  );
};

export default UserMainHeader;
