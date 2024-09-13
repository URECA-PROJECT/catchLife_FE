import React from 'react';
import '../App.css'

function StoreList(props) {

    // props로 받아올 것
    const storeCnt = 2; // 매장 개수

    return (
        <div>
            <h3>내 매장 관리 {storeCnt}</h3>
        </div>
    );
}

export default StoreList;