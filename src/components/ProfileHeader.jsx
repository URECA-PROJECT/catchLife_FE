import React from "react";
import "../css/yewon.css";
import { Link } from "react-router-dom";
import UserMainHeader from "./UserMainHeader";
import { useLogin } from "../context/LoginContext";

function ProfileHeader(props) {
  const { isAdmin, name, phone, password, memberNum } = props;
  const { member } = useLogin();

  return (
    <>
      <UserMainHeader center={"마이페이지"} />
      <div className="profile-header">
        <div className="profile-info">
          {member.profileImage ? (
            <img
              src={member.profileImage}
              alt="Profile"
              className="profile-picture w-3/12 rounded-[50px]"
            />
          ) : (
            <img
              src="/assets/img/profilepicture.png"
              alt="Profile"
              className="profile-picture w-3/12 rounded-xl"
            />
          )}
          <div className="profile-details">
            <strong style={{ fontSize: "20px" }}>{name}</strong>
            {isAdmin ? <span> 사장님</span> : <span> 님</span>}
          </div>
        </div>
        <Link
          to="/mypage/editprofile"
          state={{ name, phone, password, memberNum }}
        >
          <button className="btn-edit-profile">프로필 수정</button>
        </Link>
      </div>
    </>
  );
}

export default ProfileHeader;
