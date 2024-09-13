import React from 'react';
import '../App.css'

function ProfileHeader(props) {

    const {isAdmin} = props;
    // props로 받아와야 하는 것들
    const name = "김예원";
    const reviewCnt = 3; // 사용자가 쓴 리뷰 개수

    return (
        <div className="profile-header">
            <div className="profile-mypage">
                <h2>마이페이지</h2>
            </div>
            <div className="profile-info">
                <img src="/assets/img/profile.png" alt='Profile' className="profile-picture"/>
                <div className='profile-details'>
                    <strong>{name}</strong>
                        {isAdmin ? (<span> 사장님</span>) : (<div> 나의 리뷰 <strong>{reviewCnt}건</strong></div>)}
                </div>
            </div>
            <button className='btn-edit-profile'>프로필 수정</button>
        </div>
    );
}

export default ProfileHeader;

