import React from 'react';
import '../css/yewon.css'
import { Link } from 'react-router-dom';

function ProfileHeader(props) {

    const {isAdmin, name, phone, password, memberNum} = props;
    
    return (
        <div className="profile-header">
            <div className="profile-mypage">
                <h2>마이페이지</h2>
            </div>
            <div className="profile-info">
                <img src="/assets/img/profilepicture.png" alt='Profile' className="profile-picture"/>
                <div className='profile-details'>
                    <strong style={{fontSize: "20px"}}>{name}</strong>
                        {isAdmin ? (<span> 사장님</span>) : (<span> 님</span>)}
                </div>
            </div>
            <Link to='/mypage/editprofile' state={{name, phone, password, memberNum}}><button className='btn-edit-profile'>프로필 수정</button></Link>
        </div>
    );
}

export default ProfileHeader;

