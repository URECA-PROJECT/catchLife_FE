import React, { useEffect, useState } from 'react';
import '../../css/yewon.css'
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs'; // 날짜 관련 라이브러리 사용 (dayjs)
import isBetween from 'dayjs/plugin/isBetween'; // 날짜 비교용 플러그인

dayjs.extend(isBetween);

function ReservationManagement(props) {

    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(dayjs()); // 현재 월 (dayjs 사용)
    const [reservations, setReservations] = useState([]);

    // 요일 배열 생성 (월~일)
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    
    // 예약 데이터 가져오기
    // 예약 데이터 가져오기
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                // 서버에서 예약 데이터 가져오기
                const response = await fetch('http://localhost:8080/orders');
                const data = await response.json();

                // 예약 데이터에서 member_id로 회원 정보 가져오기
                const memberIds = [...new Set(data.map(res => res.memberId))]; // 중복 제거한 member_id 리스트
                const memberRequests = memberIds.map(id => fetch(`http://localhost:8080/members/${id}`).then(res => res.json()));

                console.log(memberRequests)

                const memberData = await Promise.all(memberRequests);
                const membersMap = memberData.reduce((acc, member) => {
                    acc[member.id] = member.name;
                    return acc;
                }, {});

                // 예약 데이터와 이름을 결합
                const reservationsWithNames = data.map(res => ({
                    ...res,
                    name: membersMap[res.memberId] || 'Unknown'
                }));

                setReservations(reservationsWithNames); // 상태에 저장
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, []);

    console.log(reservations)

    // 현재 월의 첫 번째 날짜와 마지막 날짜 가져오기
    const startOfMonth = currentMonth.startOf('month');
    const endOfMonth = currentMonth.endOf('month');

    // 이전 달로 이동 
    function handlePreviousMonth() {
        setCurrentMonth(currentMonth.subtract(1, 'month'));
    }

    // 다음 달로 이동
    function handleNextMonth() {
        setCurrentMonth(currentMonth.add(1, 'month'));
    }

    // 월간 예약 렌더링 함수
    function renderMonthlyView() {
        // 해당 월의 모든 날짜 배열 생성
        const daysInMonth = [];
        for (let day = 0; day <= endOfMonth.diff(startOfMonth, 'day'); day++) {
            const date = startOfMonth.add(day, 'day');
            daysInMonth.push(date.format('YYYY-MM-DD'));
        }

        // 해당 월의 첫 번째 요일 계산 (0: 일요일 ~ 6: 토요일)
        const firstDayOfWeek = startOfMonth.day();

        // 날짜별로 예약을 그룹화하여 렌더링
        return (
            <div className='monthly-view'>
                {/* 월 변경 버튼 */}
                <div className='month-navigation' style={{ display: "flex", justifyContent: "center", margin: "10px", padding: "10px", borderBottom: "1px solid #eee", alignItems: "center" }}>
                    <button onClick={handlePreviousMonth} class="hover:bg-gray-200 text-gray-800 font-bold py-0.5 px-3 rounded-l">{'<'}</button>
                    <span style={{ fontWeight: "bold", margin: "0 10px 0 10px" }}>{currentMonth.format('M월')}</span>
                    <button onClick={handleNextMonth} class="hover:bg-gray-200 text-gray-800 font-bold py-0.5 px-3 rounded-r">{'>'}</button>
                </div>

                {/* 요일 헤더 표시 */}
                <div className='weekday-header'>
                    {weekDays.map((day, index) => (
                        <div
                            key={index}
                            className='weekday'
                            style={{
                                color: day === '일' ? 'red' : day === '토' ? 'blue' : 'black'
                            }}
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* 날짜별 예약 정보 렌더링 */}
                <div className='calendar-grid' style={{ padding: "10px" }}>
                    {/* 빈 칸 추가 : 첫 번째 요일 전에 빈 칸 렌더링 */}
                    {Array.from({ length: firstDayOfWeek }, (_, index) => (
                        <div key={index} className='empty-slot'></div>
                    ))}

                    {/* 실제 날짜 표시 */}
                    {daysInMonth.map((date, index) => (
                        <div
                            key={index}
                            className='date-slot'
                            style={{
                                color: dayjs(date).day() === 0 ? 'red' : dayjs(date).day() === 6 ? 'blue' : 'black' // 일요일이면 빨간색, 토요일이면 파란색
                            }}
                        >
                            <div className='btn-reservation-detail'>
                                <Link to='/mypage/reservations/detail' state={{data : dayjs(date).format('M.D'), reservations: reservations}} 
                                    onClick={() => {
                                        localStorage.setItem('reservationData', JSON.stringify({
                                            data: dayjs(date).format('M.D'),
                                            reservations: reservations
                                        }));
                                }}>
                                    <div className='date-label'>
                                        {/* 날짜 및 요일 표시 */}
                                        {dayjs(date).format('M.D')}
                                    </div>
                                    <div className='reservations'>
                                        {/* 해당 날짜에 예약이 있는지 확인하고 렌더링 */}
                                        {reservations.filter(reservation => reservation.date === dayjs(date).format('YYYY-MM-DD')).map((reservation) => (
                                            <div key={reservation.id} className='reservation' style={{ color: "black", fontSize: "15px" }}>
                                                {reservation.name}
                                            </div>
                                        ))}
                                    </div>
                                </Link>
                            </div>


                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className='back-header'>
                <button className='backbutton' onClick={() => navigate('/mypage')}>←</button>
                {/* <a className='backbutton' onClick={handleBackClick}>←</a> */}
                <span className='back-header-top'>예약 관리</span>
            </div>

            {/* <div className='btn-block-reservations' style={{ display: "flex", justifyContent: "right" }}>
                <Link to="/mypage/reservations/block"><button  class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
                    style={{margin: "0 20px 0 0", textAlign: "center", fontSize: "13px" }}>예약 막기</button></Link>
            </div> */}

            <div className='reservations-calendar' style={{border: "1px solid #ddd", borderRadius: "20px", margin: "10px"}}>
                {renderMonthlyView()}
            </div>
        </div>
    );
}

export default ReservationManagement;