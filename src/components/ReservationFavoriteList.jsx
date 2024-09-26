import React, { useState } from 'react';
import myReservation from "../utils/mockData/myReservation.json";
import myFavorites from "../utils/mockData/myFavorites.json";
import '../css/yewon.css'

function ReservationFavoriteList(props) {

    // props로 받아올 것
    const favoriteCnt = myFavorites.length;

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
        <div>
            {/* sql에서 데이터 가져와서 표시 */}
            {myReservation.map((myr, index) => {
                return (
                    <div className='reservation-items'>
                        <li key={index}>{myr.date} / {myr.name_kor} {myr.name_eng} / {myr.order}</li>
                    </div>
                )
            })}
        </div>
    );
}

function FavoritesList(props) {
    return (
        <div>
            {myFavorites.map((myf, index) => {
                return (
                    <div className='favorite-items'>
                        <a href='#' style={{textDecoration: "none", color: "black"
                        }}><li key={index}>{myf.name_kor} {myf.name_eng}</li></a>
                    </div>
                )
            })}
        </div>
    );
}

export default ReservationFavoriteList;