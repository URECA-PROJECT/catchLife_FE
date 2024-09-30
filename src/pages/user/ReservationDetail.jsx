import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'; // 날짜 관련 라이브러리 사용 (dayjs)

function ReservationDetail(props) {
    const location = useLocation();
    const navigate = useNavigate();

    // state로 관리하지 않을 경우 뒤로 가기 버튼 눌렀을 때 data 값이 바뀌어서 화면에 이상한 날짜로 표시됨
    const [data, setData] = useState(location.state?.data || JSON.parse(localStorage.getItem('reservationData'))?.data || '');
    const [reservationList, setReservationList] = useState([]);
    const [memberNames, setMemberNames] = useState({});
    const [storeNames, setStoreNames] = useState({});
    const [productNames, setProductNames] = useState({});

    const reservations = location.state?.reservations || [];

    useEffect(() => {
        if (!data) {
            const storedData = JSON.parse(localStorage.getItem('reservationData'));
            setData(storedData?.data);
        }

        // 날짜가 같은 reservation 필터링
        const filteredReservations = reservations.filter(rv => dayjs(rv.date).format('M.D') === data);
        setReservationList(filteredReservations);

        // member, store, product 정보 fetch
        const fetchAdditionalData = async () => {
            // memberId로 member 테이블에서 이름을 가져오기
            const memberFetches = filteredReservations.map((res) => 
                fetch(`http://localhost:8080/members/${res.memberId}`).then(res => res.json())
            );
            
            // storeId로 store 테이블에서 매장명 가져오기
            const storeFetches = filteredReservations.map((res) => 
                fetch(`http://localhost:8080/storelist/${res.storeId}`).then(res => res.json())
            );
            
            // productId로 product 테이블에서 상품명 가져오기
            const productFetches = filteredReservations.map((res) => 
                fetch(`http://localhost:8080/products/list/${res.productId}`).then(res => res.json())
            );

            const memberResults = await Promise.all(memberFetches);
            const storeResults = await Promise.all(storeFetches);
            const productResults = await Promise.all(productFetches);

            const memberNamesMap = {};
            const storeNamesMap = {};
            const productNamesMap = {};

            memberResults.forEach((member, index) => {
                memberNamesMap[filteredReservations[index].memberId] = member.name;
            });

            storeResults.forEach((store, index) => {
                storeNamesMap[filteredReservations[index].storeId] = store.store;
            });

            productResults.forEach((product, index) => {
                productNamesMap[filteredReservations[index].productId] = product.name;
            });

            setMemberNames(memberNamesMap);
            setStoreNames(storeNamesMap);
            setProductNames(productNamesMap);
        };

        fetchAdditionalData();
    }, [data]);

    // 현재 연도 가져와서 data와 합쳐주기
    const currentYear = dayjs().year();
    const fullDate = dayjs(`${currentYear}.${data}`, 'YYYY-M.D');

    // 'YYYY년 M월 D일' 형식으로 변환
    const formattedDate = fullDate.format('YYYY년 M월 D일');

    const formatContentAsText = (contentObj) => {
        // contentObj가 JSON 문자열이면 파싱 시도
        try {
            contentObj = typeof contentObj === 'string' ? JSON.parse(contentObj) : contentObj;
        } catch (e) {
            console.error("JSON 파싱 에러:", e);
            return '내용을 파싱할 수 없습니다.';
        }
    
        if (typeof contentObj === 'object' && contentObj !== null) {
            return Object.entries(contentObj)
                .map(([key, value]) => `${key}: ${value}`) // 'key: value' 형식으로 변환
                .join(' / '); // ', '로 결합
        }
    
        return '내용이 올바르지 않습니다.';
    };

    return (
        <div>
            <div className='back-header'>
                <button className='backbutton' onClick={() => navigate('/mypage/reservations')}>←</button>
                <span className='back-header-top'>예약 상세</span>
            </div>

            <div className='today-date' style={{display: "flex", justifyContent: "center", fontSize: "25px", margin: "0 30px", borderBottom: "2px solid #ddd"}}>
                {formattedDate}
            </div>

            {/* 필터링된 예약 정보와 추가 데이터를 렌더링 */}
            {reservationList.map((rl) => (
                <div key={rl.id} style={{border: "2px solid #ddd", margin: "20px", padding: "20px", borderRadius: "10px"}}>
                    <div style={{fontSize: "20px"}}>{memberNames[rl.memberId]}님 {rl.time}</div>
                    <div>{productNames[rl.productId]}</div>
                    <div style={{color: "lightgray"}}>{formatContentAsText(rl.content)}</div> {/* content 객체를 텍스트로 출력 */}
                </div>
            ))}
        </div>
    );
}

export default ReservationDetail;