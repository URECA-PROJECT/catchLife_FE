import React, { useState, useEffect } from "react";

const Reservation = () => {

    const storeID = 1; // props로 받아오기
    const [openTime, setOpenTime] = useState("");
    const [closeTime, setCloseTime] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [availableTimes, setAvailableTimes] = useState([]);
    const [reservedTimes, setReservedTimes] = useState([]);

    // 가게의 openTime과 closeTime 불러오기
    useEffect(() => {
        fetch(`/store/${storeID}`)
        .then((response) => response.json())
        .then((data) => {
            const { openTime, closeTime } = data;
            setOpenTime(openTime);
            setCloseTime(closeTime);

            // 1시간 단위로 예약 가능한 시간대 생성
            const available = generateAvailableTimes(openTime, closeTime);
            setAvailableTimes(available);
        })
        .catch((error) => console.error("Error fetching store data:", error));
    }, [storeID]);

    // 날짜를 선택했을 때 해당 날짜의 예약된 시간 불러오기
    useEffect(() => {
        if (selectedDate) {
        fetch(`/reservations/${storeID}/${selectedDate}`)
            .then((response) => response.json())
            .then((data) => {
            setReservedTimes(data);
            })
            .catch((error) => console.error("Error fetching reserved times:", error));
        }
    }, [selectedDate]);

    // 예약 가능한 시간대 생성 함수
    const generateAvailableTimes = (openTime, closeTime) => {
        const times = [];
        let currentHour = parseInt(openTime.split(":")[0]);

        while (currentHour < parseInt(closeTime.split(":")[0])) {
        const timeString = `${currentHour}:00`;
        times.push(timeString);
        currentHour++;
        }

        return times;
    };

    // '예약' 버튼 클릭 시 실행
    const handleReservation = () => {
        const confirmed = window.confirm("예약하시겠습니까?");
        if (confirmed) {
        const reservationData = {
            storeID,
            year: selectedDate.split("-")[0],
            month: selectedDate.split("-")[1],
            day: selectedDate.split("-")[2],
            time: selectedTime,
        };

        fetch("/reservation-time", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(reservationData),
        })
            .then((response) => response.json())
            .then(() => alert("예약 완료"))
            .catch((error) => console.error("예약 실패", error));
        }
    };

    return (
        <div>
        <h2>예약 페이지</h2>
        <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
        />
        <div>
            {availableTimes.map((time) => (
            <button
                key={time}
                onClick={() => setSelectedTime(time)}
                disabled={reservedTimes.includes(time)} // 예약된 시간대는 비활성화
                style={{ backgroundColor: reservedTimes.includes(time) ? "gray" : "white" }}
            >
                {time}
            </button>
            ))}
        </div>
        <button onClick={handleReservation}>예약</button>
        </div>
    );
};

export default Reservation;