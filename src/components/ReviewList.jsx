import React from 'react';
import '../App.css'

function ReviewList(props) {

    // props로 받아올 것
    const prevCnt = 4; // 방문했던 매장 개수

    return (
        <div>
            <div className='review-header'>
                <span><strong>리뷰 작성 </strong>{prevCnt} </span>
                <span style={{color: "#00000036", fontSize: "15px"}}>방문했던 매장</span>
            </div>
            <div className='review-list'>
                작성할 수 있는 리뷰 목록
            </div>
        </div>
    );
}

export default ReviewList;