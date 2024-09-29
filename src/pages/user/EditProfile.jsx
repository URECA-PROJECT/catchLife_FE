import React, { useEffect, useState } from "react";
import "../../css/yewon.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../../context/LoginContext";
import API from "../../utils/axios";

function EditProfile(props) {
  const { member, setMember } = useLogin();
  const location = useLocation();
  const { name } = location.state || {};
  const [profileImageFile, setProfileImageFile] = useState();
  const [newPhone, setNewPhone] = useState(member.phone || "");
  const [newPassword, setNewPassword] = useState(member.password || "");
  const navigate = useNavigate();

  const handleGetImage = (fullUrl) => {
    // fullUrl에서 파일 이름 추출
    console.log("fullUrl", fullUrl);
    const fileName = fullUrl.split("/").pop(); // URL의 마지막 부분을 추출
    const backendUrl = `/uploads/${fileName}`; // 백엔드 URL 조합
    console.log("fileName", fileName);
    console.log(backendUrl);
    // Axios로 Blob 요청
    API.get(backendUrl, { responseType: "blob" })
      .then((response) => {
        navigate(-1);
        console.log("응답상태", response);
        // 상태 코드가 200인 경우에만 Blob으로 변환
        if (response.status === 200) {
          console.log("응답 데이터 타입:", response.data instanceof Blob);

          const imgURL = URL.createObjectURL(response.data); // Blob을 URL로 변환
          console.log("이미지 url", imgURL);
          setProfileImageFile(imgURL); // state를 업데이트하여 이미지 표시
          setMember({
            ...member,
            profileImage: profileImageFile,
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
    console.log(member);
    // setProfileImageFile(member.profileImage);
  }, [member]);

  // 프로필 이미지 변경 함수
  function handleImageChange(e) {
    const file = e.target.files[0]; // 파일 가져오기

    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfileImageFile(ev.target.result); // 이미지 src 변경
        console.log("변경된 이미지 URL:", ev.target.result); // 변경된 URL 확인
      };
      reader.readAsDataURL(file); // 파일을 읽어서 data URL로 변환
    } else {
      const defaultImage = "/assets/img/profilePicture.png"; // 기본 이미지
      setProfileImageFile(defaultImage); // 기본 이미지로 변경
      console.log("기본 이미지 설정:", defaultImage); // 기본 이미지 확인
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

    // 프로필 이미지가 있을 경우 추가
    if (profileImageFile) {
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
      <div className="back-header">
        <button className="backbutton" onClick={handleBackClick}>
          ←
        </button>
        {/* <a className='backbutton' onClick={handleBackClick}>←</a> */}
        <span className="back-header-top">프로필 수정</span>
      </div>

      <div className="edit-profile">
        <form className="yewon-form" onSubmit={handleSubmit}>
          <div className="edit-profile-image">
            <label htmlFor="file-input">
              <img
                src={member.profileImage}
                alt="Profile"
                className="profile-picture"
                style={{ margin: "20px auto" }}
              />
            </label>
          </div>
          <input
            id="file-input"
            className="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label>성함</label>
          <input type="text" value={name} readOnly /> <br />
          <label>전화번호</label>
          <input
            type="text"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />
          <br />
          <label>비밀번호 수정</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
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
