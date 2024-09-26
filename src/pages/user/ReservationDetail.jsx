import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'; // 날짜 관련 라이브러리 사용 (dayjs)
import reservations from '../../../src/utils/mockData/UserReservations.json';

function ReservationDetail(props) {
    const location = useLocation();
    const navigate = useNavigate();

    // 데이터가 없으면 localStorage에서 불러오기 (state로 관리하지 않을 경우 뒤로 가기 버튼 눌렀을 때 data 값이 바뀌어서 화면에 이상한 날짜로 표시됨)
    const [data, setData] = useState(location.state?.data || JSON.parse(localStorage.getItem('reservationData'))?.data || '');
    const [reservationList, setReservationList] = useState([]);

    useEffect(() => {
        if (!data) {
            const storedData = JSON.parse(localStorage.getItem('reservationData'));
            setData(storedData?.data);
        }
        setReservationList(reservations.filter(rv => dayjs(rv.date).format('M.D') === data));
    }, [data]);
    
    // 현재 연도 가져와서 data와 합쳐주기
    const currentYear = dayjs().year();
    const fullDate = dayjs(`${currentYear}.${data}`, 'YYYY-M.D');

    // 'YYYY년 M월 D일' 형식으로 변환
    const formattedDate = fullDate.format('YYYY년 M월 D일');

    function handleBackClick() {
        navigate(-1);
    }

    return (
        <div>
            <div className='back-header'>
                <a href='#' className='backbutton' onClick={handleBackClick}>←</a>
                <span className='back-header-top'>예약 목록</span>
            </div>

            <div className='today-date'>
                {/* {formattedDate} */}
            </div>

            {reservationList.map((rl) => (
                <div>{rl.name} {rl.startTime} ~ {rl.endTime}</div>
            ))}
        </div>
    );
}

export default ReservationDetail;