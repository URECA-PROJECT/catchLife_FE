import React, { useEffect, useState } from "react";
import "../../css/yewon.css";
import "../../css/Signup.css";
import "../../css/Login.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../../context/LoginContext";
import API from "../../utils/axios";
import UserMainHeader from "../../components/UserMainHeader";

function EditProfile(props) {
  const { member, setMember } = useLogin();
  const location = useLocation();
  const { name } = location.state || {};
  const [profileImageFile, setProfileImageFile] = useState(
    "/assets/img/profilePicture.png"
  );
  const [newPhone, setNewPhone] = useState(member.phone || "");
  const [newPassword, setNewPassword] = useState(member.password || "");
  const navigate = useNavigate();

  const handleGetImage = (fullUrl) => {
    console.log("fullUrl", fullUrl);
    const fileName = fullUrl.split("/").pop(); // URL의 마지막 부분을 추출
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
          console.log("이미지 url", imgURL);
          setProfileImageFile(imgURL); // state를 업데이트하여 이미지 표시
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
    console.log(member.profileImage, profileImageFile);
  }, []);

  // 프로필 이미지 임시 변경 함수
  function handleImageChange(e) {
    const file = e.target.files[0]; // 파일 가져오기

    if (file) {
      const reader = new FileReader();

      reader.onload = (ev) => {
        setProfileImageFile(ev.target.result); // 이미지 src 변경
        setMember({
          ...member,
          profileImage: ev.target.result,
        });
      };

      reader.readAsDataURL(file); // 파일을 읽어서 data URL로 변환
    } else {
      setProfileImageFile("./assets/img/profilePicture.png"); // 기본 이미지로 변경
    }
  }

  function handleSubmit(e) {
    e.preventDefault(); // 기본 폼 동작 방지

    const formData = new FormData();
    const memberData = {
      id: member.id, // 확인: 이 값이 유효한 ID인지 확인
      memberid: member.memberId, // 확인: 이 값이 유효한 ID인지 확인
      phone: newPhone, // 새로운 전화번호
      password: newPassword, // 비밀번호
    };

    formData.append(
      "member",
      new Blob([JSON.stringify(memberData)], { type: "application/json" })
    );

    if (profileImageFile && profileImageFile.startsWith("data:image/")) {
      formData.append("profileImage", profileImageFile); // 프로필 이미지 파일 추가
    }

    // FormData의 내용을 콘솔에 출력
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // 서버에 전화번호, 비밀번호 및 프로필 이미지 업데이트 요청
    fetch("http://localhost:8080/members/update", {
      method: "POST",
      body: formData, // FormData 사용
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("수정이 완료되었습니다.");
        navigate("/mypage");

        setMember(data.updatedMember);

        const imageFileName = data.updatedMember.profileImage.replace("./", ""); // './'를 제거
        console.log(imageFileName);
        const imageUrl = `http://localhost:8080/${imageFileName}`; // 절대 경로로 설정
        handleGetImage(imageUrl);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // 이전 페이지로 돌아가기 함수
  function handleBackClick() {
    navigate(-1);
  }

  return (
    <div>
      <UserMainHeader center={"프로필 수정"} />

      <div className="edit-profile">
        <form className="yewon-form" onSubmit={handleSubmit}>
          <div className="edit-profile-image">
            <label htmlFor="file-input" className="file-seunghee">
              <img
                src="/assets/img/profilePicture.png"
                alt="Profile"
                className="profile-picture"
                style={{ margin: "20px auto", width: "100px", borderRadius: "100%"}}
              />
            </label>
          </div>
          <input
            id="file-input"
            className="mx-auto yewon-form-label"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <div className="login-div flex items-center w-full mx-auto">
            <label className="yewon-form-label">성함</label>
            <input type="text" value={name} readOnly />
          </div>
          <div className="login-div flex items-center w-full mx-auto">
            <label className="yewon-form-label">아이디</label>
            <input
              type="text"
              value={member.memberid || member.memberId}
              readOnly
            />{" "}
            <br />
          </div>
          <div className="login-div flex items-center w-full mx-auto">
            <label className="yewon-form-label">전화번호</label>
            <input
              type="text"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
            />
          </div>
          <div className="login-div flex items-center w-full mx-auto">
            <label className="yewon-form-label">비밀번호 수정</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <br />
          <div className="button-container">
            <button type="submit">완료</button>
            <button type="button" onClick={handleBackClick}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
