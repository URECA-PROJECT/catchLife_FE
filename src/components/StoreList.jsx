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
            <div className='mystores'>
                {myStores.map((ms, index) => {
                    return (
                        <li className='mystores-list' key={index}>{ms.name_kor} {ms.name_eng} <span />
                            <Link to="/mypage/reservations"><button>예약 관리</button></Link>
                            <Link to="/mypage/stores"><button>매장 관리</button></Link>
                            <Link to="/mypage/editstores"><button>매장 정보 수정</button></Link>
                        </li>
                    )
                })}
            </div>
        </div>
    );
}

export default StoreList;