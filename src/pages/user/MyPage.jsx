import React from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import ReservationFavoriteList from '../../components/ReservationFavoriteList';
import ReviewList from '../../components/ReviewList';
import StoreList from '../../components/StoreList';
import '../../css/yewon.css'

function MyPage(props) {

    const isAdmin = false; // 유저 / 사장님 구분
    return (
        <div>
            <ProfileHeader isAdmin={isAdmin} />
            {/* 일반 유저면 예약 매장 목록을, 관리자면 내 매장 목록을 표시 */}
            {isAdmin? (<StoreList />) : (<ReservationFavoriteList />)}
            {isAdmin? (<></>) : (<ReviewList />)}
            
        </div>
    );
}

export default MyPage;