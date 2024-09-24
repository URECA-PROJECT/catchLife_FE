import React, { useState } from 'react';
import '../../css/yewon.css'
import { useNavigate } from 'react-router-dom';

function EditStores(props) {

    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState('/assets/img/profilepicture.png');
    const [openTime, setOpenTime] = useState('00:00');
    const [closeTime, setCloseTime] = useState('23:00');
    const [type, setType] = useState('뷰티');
    const [region, setRegion] = useState('서울');

    // 00:00 ~ 23:00 1시간 단위로 선택지를 생성
    const timeOptions = [];
    for (let i = 0; i <= 23; i++) {
        const time = i < 10 ? `0${i}:00` : `${i}:00`;
        timeOptions.push(
        <option key={time} value={time}>
            {time}
        </option>
        );
    }

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

    // 이전 페이지로 돌아가기 함수
    function handleBackClick() {
        navigate(-1);
    }

    return (
        <div>
            <div className='back-header'>
                <a href='#' className='backbutton' onClick={handleBackClick}>←</a>
                <span className='back-header-top'>매장 정보 수정</span>
            </div>

            <div className='edit-profile'>
                <form className='yewon-form'>
                    <div className='edit-profile-image'>
                        <label htmlFor='file-input'>
                            <img src={profileImage} alt='Profile' className='profile-picture' />
                        </label>
                    </div>
                    <input id='file-input' className='file-input' type='file' accept='image/*' onChange={handleImageChange} style={{display: "none"}}/>
                    <label>매장명(한글)</label>
                    <input type='text'></input>
                    <label>매장명(영문)</label>
                    <input type='text'></input>
                    
                    <label>업종</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option>뷰티</option>
                        <option>베이커리</option>
                        <option>공방</option>
                    </select>

                    <label>지역</label>
                    <select value={region} onChange={(e) => setRegion(e.target.value)}>
                        <option>서울</option>
                        <option>경기</option>
                        <option>인천</option>
                        <option>충청</option>
                    </select>

                    <label>오픈 / 마감</label>
                    <div style={{width: "300px", display: "flex", alignItems: "baseline", flexDirection:"row", justifyContent: "space-between"}}>
                        <select value={openTime} onChange={(e) => setOpenTime(e.target.value)}>
                            {timeOptions}
                        </select>
                        <span style={{margin: "10px"}}>&nbsp;~&nbsp;</span>
                        <select value={closeTime} onChange={(e) => setCloseTime(e.target.value)}>
                            {timeOptions}
                        </select>
                    </div> <br />

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

export default EditStores;