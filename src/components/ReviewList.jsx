import React from 'react';
import '../css/yewon.css'
import visitedStores from '../utils/mockData/visitedStores.json';

function ReviewList(props) {

    // props로 받아올 것
    const prevCnt = visitedStores.length; // 방문했던 매장 개수

    return (
        <div>
            <div className='review-header'>
                <span><strong>리뷰 작성 </strong>{prevCnt} </span>
                <span style={{color: "#00000036", fontSize: "15px"}}>방문했던 매장</span>
            </div>
            <div className='review-list'>
                {visitedStores.map((st, index) => {
                    return (
                        // 클릭하면 리뷰 작성 페이지로 이동
                        <div className='review-items'>
                            <a href='#'><li key={index}>{st.name_kor} / {st.name_eng} / {st.date} <br /> {st.order} / {st.price}</li></a>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default ReviewList;