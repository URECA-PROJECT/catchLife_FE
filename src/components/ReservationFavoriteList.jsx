import React, { useState } from 'react';
import '../App.css'

function ReservationFavoriteList(props) {

    // props로 받아올 것
    const favoriteCnt = 1;

    // '다가오는 예약', '즐겨찾는 매장' 버튼 -> 활성화된 탭 상태 관리 ('reservations' 또는 'favorites')
    const [activeTab, setActiveTab] = useState('reservations'); 

    return (
        <div>
            <div className="tab-menu">
                <button className={activeTab === 'reservations' ? 'active' : ''}
                    onClick={() => setActiveTab('reservations')}>
                    다가오는 예약
                </button>
                <button className={activeTab === 'favorites' ? 'active' : ''}
                    onClick={() => setActiveTab('favorites')}>
                    즐겨찾는 매장 {favoriteCnt}
                </button>
            </div>

            {/* 탭에 따라 내용 렌더링 다르게 */}
            {activeTab==='reservations' ? <ReservationList /> : <FavoritesList />}
        </div>
    );
};

function ReservationList(props) {
    return (
        <div className='reservation-list'>
            {/* sql에서 데이터 가져와서 표시 */}
            예약한 매장 목록
        </div>
    );
}

function FavoritesList(props) {
    return (
        <div className='favorite-list'>
            즐겨찾기 매장 목록
        </div>
    );
}

export default ReservationFavoriteList;