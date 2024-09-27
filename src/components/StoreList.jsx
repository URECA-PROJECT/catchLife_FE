import React from 'react';
import '../css/yewon.css'
import myStores from '../utils/mockData/myStores.json'
import { Link } from 'react-router-dom';

function StoreList(props) {

    // props로 받아올 것
    const storeCnt = 2; // 매장 개수

    return (
        <div>
            <div className='mystores-header'>
                <span><strong>내 매장 관리 </strong>{storeCnt}</span>
            </div>

            <div className='my-store-register' style={{display: "flex", justifyContent: "flex-end", margin: "0 20px"}}>
                <Link><button class="bg-black text-white py-1.5 px-4 border rounded shadow" style={{fontSize: "14px"}}>내 매장 등록하기</button></Link>
            </div>
            <div className='mystores'>
                {myStores.map((ms, index) => {
                    return (
                        <li className='mystores-list' key={index}>{ms.name_kor} {ms.name_eng} <span />
                            <Link to="/mypage/reservations"><button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded shadow">예약 관리</button></Link>
                            <Link to="/mypage/storemanage"><button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded shadow">매장 관리</button></Link>
                            <Link to="/mypage/editstores"><button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded shadow">매장 정보 수정</button></Link>
                        </li>
                    )
                })}
            </div>
        </div>
    );
}

export default StoreList;