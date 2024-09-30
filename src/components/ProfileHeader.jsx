import React, { useEffect, useState } from "react";
import "../css/yewon.css";
import { Link, useNavigate } from "react-router-dom";
import UserMainHeader from "./UserMainHeader";
import { useLogin } from "../context/LoginContext";
import API from "../utils/axios";

function ProfileHeader(props) {
  const navigate = useNavigate();
  const { isAdmin, name, phone, password, memberNum } = props;
  const [profileImage, setProfileImage] = useState();
  const { member, setMember } = useLogin();

  const handleGetImage = (profileImage) => {
    console.log("fullUrl", profileImage);
    const fileName = profileImage.split("/").pop(); // URL의 마지막 부분을 추출
    const backendUrl = `/uploads/${fileName}`; // 백엔드 URL 조합
    console.log("fileName", fileName);
    console.log(backendUrl);
    // Axios로 Blob 요청
    API.get(backendUrl, { responseType: "blob" })
      .then((response) => {
        navigate("/mypage");
        console.log("응답상태", response);
        // 상태 코드가 200인 경우에만 Blob으로 변환
        if (response.status === 200) {
          console.log("응답 데이터 타입:", response.data instanceof Blob);

          const imgURL = URL.createObjectURL(response.data); // Blob을 URL로 변환
          setProfileImage(imgURL); // state를 업데이트하여 이미지 표시
          localStorage.setItem("profileImage", imgURL);
          setMember({
            ...member,
            profileImage: localStorage.getItem("profileImage"),
          });
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };

  useEffect(() => {
    const img = localStorage.getItem("profileImage");
    console.log("마이페이지 이미지", img);

    handleGetImage(img);
  }, []);

  useEffect(() => {
    setMember({
      ...member,
      profileImage: localStorage.getItem("profileImage"),
    });
  }, [profileImage]);

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
