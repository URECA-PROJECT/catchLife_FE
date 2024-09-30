import React, { useEffect, useState } from 'react';
import myReservation from "../utils/mockData/myReservation.json";
import '../css/yewon.css';
import { useLogin } from '../context/LoginContext';

function ReservationFavoriteList(props) {

    const [activeTab, setActiveTab] = useState('reservations');  // '다가오는 예약', '즐겨찾는 매장' 탭 상태
    const [bookmarkList, setBookmarkList] = useState([]);  // bookmarkList를 상위 컴포넌트에서 관리

    const { member } = useLogin();  // 로그인된 사용자 정보
    const memberId = member.id;  // 전역 변수에서 가져와야 함

    // 즐겨찾기 목록 가져오기
    useEffect(() => {
        fetch('http://localhost:8080/bookmark')
            .then(response => response.json())
            .then(data => {
                const filteredBookmarks = data.filter(bm => bm.memberID === memberId);  // 로그인된 사용자 ID와 일치하는 항목만 필터링
                setBookmarkList(filteredBookmarks);  // 필터링된 bookmarkList 저장
            })
            .catch(error => console.error('Error: ', error));
    }, [memberId]);

    return (
        <div>
            <div className="tab-menu">
                <button className={activeTab === 'reservations' ? 'active' : ''}
                    onClick={() => setActiveTab('reservations')}>
                    다가오는 예약
                </button>
                <button className={activeTab === 'favorites' ? 'active' : ''}
                    onClick={() => setActiveTab('favorites')}>
                    즐겨찾는 매장 {bookmarkList.length} {/* 즐겨찾는 매장 개수 표시 */}
                </button>
            </div>

            {/* 탭에 따라 내용 다르게 렌더링 */}
            {activeTab === 'reservations' ? <ReservationList /> : <FavoritesList bookmarkList={bookmarkList} />}
        </div>
    );
}

function ReservationList(props) {



    return (
        <div>
            {/* sql에서 데이터 가져와서 표시 */}
            {myReservation.map((myr, index) => {
                return (
                    <div className='reservation-items' key={index}>
                        <li>{myr.date} / {myr.name_kor} {myr.name_eng} / {myr.order}</li>
                    </div>
                );
            })}
        </div>
    );
}

function FavoritesList({ bookmarkList }) {

    const [storeDetailsList, setStoreDetailsList] = useState([]);

    // storeID에 해당하는 store 또는 store_list 정보 가져오기
    useEffect(() => {
        const fetchStoreDetails = async () => {
            try {
                // bookmarkList가 비어있지 않으면 storeID들만 가져와서 storeList와 비교
                if (bookmarkList.length > 0) {
                    const storeIDs = bookmarkList.map(bm => bm.storeID);
                    
                    // storeID에 해당하는 storelist 테이블에서 정보 가져오기
                    const storeResponses = await Promise.all(
                        storeIDs.map(storeID => 
                            fetch(`http://localhost:8080/storelist`)
                            .then(response => response.json())
                            .then(storeList => {
                                // storelist에서 storeID와 일치하는 store 찾기
                                return storeList.find(store => store.id === storeID);
                            })
                            .catch(error => console.error('Error: ', error))
                        )
                    );
                    
                    // storeResponses에 각 storeID에 해당하는 store 정보를 저장
                    setStoreDetailsList(storeResponses);
                }
            } catch (error) {
                console.error('Error fetching store details:', error);
            }
        };

        fetchStoreDetails();
    }, [bookmarkList]);

    return (
        <div>
            {storeDetailsList.map((store, index) => (
                <div className='favorite-items' key={index}>
                    <li>{store.store}</li> {/* store 이름을 표시 */}
                </div>
            ))}
        </div>
    );
}

export default ReservationFavoriteList;