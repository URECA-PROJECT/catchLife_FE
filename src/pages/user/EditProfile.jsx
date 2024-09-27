import React, { useState } from 'react';
import '../../css/yewon.css'
import { useLocation, useNavigate } from 'react-router-dom';

function EditProfile(props) {
    const location = useLocation();
    const {name, phone,password, memberNum} = location.state || {};
    const [profileImage, setProfileImage] = useState('/assets/img/profilepicture.png');
    const [newPhone, setNewPhone] = useState(phone || '');
    const [newPassword, setNewPassword] = useState(password || '');
    const navigate = useNavigate();


    // 프로필 이미지 변경 함수
    function handleImageChange(e) {
        const file = e.target.files[0]; // 파일 가져오기

        if (file) {
            const reader = new FileReader();

            reader.onload = (ev) => {
                setProfileImage(ev.target.result); // 이미지 src 변경
            };

            reader.readAsDataURL(file); // 파일을 읽어서 data URL로 변환 
        } else {
            setProfileImage('/assets/img/profilePicture.png'); // 기본 이미지로 변경
        }
    }

    // 폼 제출 (전화번호, 비밀번호 수정 가능)
    function handleSubmit(e) {
        e.preventDefault(); // 기본 폼 동작 방지

        // 서버에 전화번호와 비밀번호 업데이트 요청
        fetch('http://localhost:8080/members/update', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                id: memberNum,
                phone: newPhone,
                password: newPassword,
            }),
        })
        .then(response => response.json())
        .then(data => {
            alert('수정이 완료되었습니다.');
            navigate(-1);
        })
        .catch(error => {
            console.error('Error:', error)
        })
    }

    // 이전 페이지로 돌아가기 함수
    function handleBackClick() {
        navigate(-1);
    }

    return (
        <div>
            <div className='back-header'>
                <a href='#' className='backbutton' onClick={handleBackClick}>←</a>
                <span className='back-header-top'>프로필 수정</span>
            </div>

            <div className='edit-profile'>
                <form className='yewon-form' onSubmit={handleSubmit}>
                    <div className='edit-profile-image'>
                        <label htmlFor='file-input'>
                            <img src={profileImage} alt='Profile' className='profile-picture' style={{margin: "20px auto"}}/>
                        </label>
                    </div>
                    <input id='file-input' className='file-input' type='file' accept='image/*' onChange={handleImageChange} style={{display: "none"}}/>
                    
                    <label>성함</label>
                    <input type='text' value={name} readOnly /> <br />

                    <label>전화번호</label>
                    <input type='text' value={newPhone} onChange={(e) => setNewPhone(e.target.value)} /><br />

                    <label>비밀번호 수정</label> 
                    <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /><br /><br />

                    <div className='button-container'>
                        <button type='submit'>완료</button>
                        <button type='button' onClick={handleBackClick}>취소</button>
                    </div>
                </form>
            </div>

            <div style={{textAlign: "center"}}>
                하단 nav-bar
            </div>
        </div>
    );
}

export default EditProfile;