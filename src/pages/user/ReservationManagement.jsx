import React, { useEffect, useState } from 'react';
import '../../css/yewon.css'
import { useNavigate } from 'react-router-dom';
import userReservations from '../../../src/utils/mockData/UserReservations.json'
import dayjs from 'dayjs'; // 날짜 관련 라이브러리 사용 (dayjs)
import isBetween from 'dayjs/plugin/isBetween'; // 날짜 비교용 플러그인
import weekOfYear from 'dayjs/plugin/weekOfYear'; // 주차 계산 플러그인

dayjs.extend(isBetween);
dayjs.extend(weekOfYear); // 주차 계산 플러그인 활성화

function ReservationManagement(props) {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('weekly'); 
    const [currentMonth, setCurrentMonth] = useState(dayjs()); // 현재 월 (dayjs 사용)
    const [currentWeekStart, setCurrentWeekStart] = useState(dayjs().startOf('week')); // 현재 주의 시작일

    // 요일 배열 생성 (월~일)
    const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
    
    // props로 받아올 것
    const openTime = "09:00";
    const closeTime = "23:00";
    
    // 예약 데이터 가져오기
    const [reservations, setReservations] = useState([]);
    useEffect(() => {
        setReservations(userReservations) // 예약 데이터 세팅
    }, []);

    // 현재 주차 정보 계산 (월 기준 주차)
    const monthStart = currentWeekStart.startOf('month');
    const weekOfMonth = Math.ceil(currentWeekStart.diff(monthStart, 'days') / 7) + 1;

    // 다음주로 이동하는 함수
    function handleNextWeek() {
        setCurrentWeekStart(currentWeekStart.add(1, 'week'));
    }

    // 이전 주로 이동
    function handlePreviousWeek() {
        setCurrentWeekStart(currentWeekStart.subtract(1, 'week'));
    }

    // 현재 주의 날짜 배열 생성 (월 ~ 일)
    const currentWeek = Array.from({ length: 7 }, (_, i) =>
        currentWeekStart.add(i, 'day').format('YYYY-MM-DD')
    );

    function handleBackClick() {
        navigate(-1);
    }

    // 주간 예약 렌더링 함수
    function renderWeeklyView() {
        const start = dayjs(`2024-09-01 ${openTime}`, 'YYYY-MM-DD HH:mm'); // 오픈 시간
        const end = dayjs(`2024-09-01 ${closeTime}`, 'YYYY-MM-DD HH:mm'); // 마감 시간
    
        // 시간대 배열 생성
        const timeSlots = [];
        let currentTime = start;
    
        while (currentTime.isBefore(end) || currentTime.isSame(end)) {
            timeSlots.push(currentTime.format('HH:mm'));
            currentTime = currentTime.add(1, 'hour'); // 1시간 단위로 증가
        }
    
        return (
            <div className='weekly-view'>
                <div className='week-navigation' style={{ display: "flex", justifyContent: "center", margin: "10px", padding: "10px", borderBottom: "1px solid #eee" }}>
                    <button onClick={handlePreviousWeek} style={{ backgroundColor: "white", border: "1px solid black", fontWeight: "bold", marginRight: "10px", borderRadius: "5px" }}>{'<'}</button>
                    <span style={{ fontWeight: "bold" }}>{currentWeekStart.format('YYYY년 M월')} {weekOfMonth}주차</span>
                    <button onClick={handleNextWeek} style={{ backgroundColor: "white", border: "1px solid black", fontWeight: "bold", marginLeft: "10px", borderRadius: "5px" }}>{'>'}</button>
                </div>
    
                {/* 시간대 표시 */}
                <div className='weekly-schedule' style={{ display: "flex", flexDirection: "row" }}>
                    <div className='time-column'>
                        {/* 빈 칸 추가 */}
                        <div className='time-slot' style={{ height: "52px" }}></div>
                        {timeSlots.map((time, index) => (
                            <div key={index} className='time-slot'>
                                {time}
                            </div>
                        ))}
                    </div>
    
                    {/* 주별로 일(day) 표시 */}
                    <div className='week-days' style={{ display: "flex", flexGrow: 1 }}>
                        {currentWeek.map((date, dayIndex) => (
                            <div key={dayIndex} className='day-column' style={{ flexGrow: 1, borderLeft: '1px solid #ccc' }}>
                                <div className='day-label' style={{ textAlign: 'center', borderBottom: '1px solid #ccc' }}>
                                    {dayjs(date).format('M.D')}
                                </div>
    
                                {/* 각 시간대에 예약이 있는지 확인하여 표시 */}
                                {timeSlots.map((time, timeIndex) => {
                                    const reservationsForThisTime = reservations.filter(
                                        (reservation) => 
                                            reservation.date === date &&
                                            dayjs(time, 'HH:mm').isBetween(
                                                dayjs(reservation.startTime, 'HH:mm'),
                                                dayjs(reservation.endTime, 'HH:mm'),
                                                null,
                                                '[)'
                                            )
                                    );
    
                                    return (
                                        <div
                                            key={timeIndex}
                                            className='time-slot'
                                            style={{
                                                height: '30px',
                                                borderBottom: '1px solid #ccc',
                                                backgroundColor: reservationsForThisTime.length > 0 ? '#e0f7fa' : 'transparent', // 예약 있으면 색칠
                                            }}
                                        >
                                            {/* 예약 정보가 있으면 표시 */}
                                            {reservationsForThisTime.length > 0 &&
                                                reservationsForThisTime.map((reservation) => (
                                                    <div
                                                        key={reservation.id}
                                                        className='reservation'
                                                        style={{
                                                            gridRowEnd: `span ${dayjs(reservation.endTime, 'HH:mm').diff(dayjs(reservation.startTime, 'hour'))}`,
                                                            backgroundColor: '#f5f5f5', // 예약 배경 색상
                                                            padding: '5px',
                                                            borderRadius: '4px',
                                                            margin: '2px 0',
                                                        }}
                                                    >
                                                        {reservation.name} - {reservation.service}
                                                    </div>
                                                ))}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

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
                <div className='month-navigation' style={{ display: "flex", justifyContent: "center", margin: "10px", padding: "10px", borderBottom: "1px solid #eee" }}>
                    <button onClick={handlePreviousMonth} style={{ backgroundColor: "white", border: "1px solid black", fontWeight: "bold", marginRight: "10px", borderRadius: "5px" }}>{'<'}</button>
                    <span style={{ fontWeight: "bold" }}>{currentMonth.format('M월')}</span>
                    <button onClick={handleNextMonth} style={{ backgroundColor: "white", border: "1px solid black", fontWeight: "bold", marginLeft: "10px", borderRadius: "5px" }}>{'>'}</button>
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
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className='back-header'>
                <a href='#' className='backbutton' onClick={handleBackClick}>←</a>
                <span className='back-header-top'>스케줄 관리</span>
            </div>

            <div className="tab-menu" style={{ borderBottom: "1px solid #eee" }}>
                <button className={activeTab === 'weekly' ? 'active' : ''}
                    onClick={() => setActiveTab('weekly')}>
                    주간
                </button>
                <button className={activeTab === 'monthly' ? 'active' : ''}
                    onClick={() => setActiveTab('monthly')}>
                    월간
                </button>
            </div>

            <div className='btn-block-reservations' style={{ display: "flex", justifyContent: "right" }}>
                <button style={{ width: "150px", height: "20px", backgroundColor: "white", borderRadius: "10px", border: "1px solid black", margin: "10px 10px 0 0", textAlign: "center", fontSize: "13px" }}>예약 막기</button>
            </div>

            <div className='reservations-calendar'>
                {/* activeTab에 따라 주간 또는 월간 뷰를 렌더링 */}
                {activeTab === 'weekly' ? renderWeeklyView() : renderMonthlyView()}
            </div>
        </div>
    );
}

export default ReservationManagement;