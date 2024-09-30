import React, { useEffect, useState } from "react";
import { useLogin } from "../context/LoginContext";

function ReservationHistory() {
    const { member } = useLogin();
    const [reservationHistory, setReservationHistory] = useState([]);
    const [storeNames, setStoreNames] = useState({});
    const [productNames, setProductNames] = useState({});

    useEffect(() => {
        const fetchReservationHistory = async () => {
            try {
                const response = await fetch(`http://localhost:8080/orders/past/${member.id}`);
                const data = await response.json();
                setReservationHistory(data);


                // 매장명과 상품명을 동시에 가져오는 로직
                const storeIds = data.map(reservation => reservation.storeId);
                const productIds = data.map(reservation => reservation.productId);

                const fetchStoreNames = storeIds.map(id =>
                    fetch(`http://localhost:8080/storelist/${id}`).then(res => res.json())
                );

                const fetchProductNames = productIds.map(id =>
                    fetch(`http://localhost:8080/products/list/${id}`).then(res => res.json())
                );

                const storeResults = await Promise.all(fetchStoreNames);
                const productResults = await Promise.all(fetchProductNames);

                const storeNamesMap = {};
                const productNamesMap = {};

                // store와 product 데이터를 맵핑해서 저장
                storeResults.forEach((store, index) => {
                    if (store && store.store) {
                        storeNamesMap[storeIds[index]] = store.store;
                    }
                });


                productResults.forEach((product, index) => {
                    if (product && product.name) {
                        productNamesMap[productIds[index]] = product.name;
                    }
                });

                setStoreNames(storeNamesMap);
                setProductNames(productNamesMap);
            } catch (error) {
                console.error("Error fetching reservation history:", error);
            }
        };

        if (member.id) {
            fetchReservationHistory();
        }
    }, [member.id]);

    // 날짜를 한국어 형식으로 변환하는 함수
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    };


    return (
        <div style={{ borderTop: "1px solid #ddd" }}>
            <div style={{ margin: "10px", padding: "10px" }}>
                <span style={{ fontSize: "25px", fontWeight: "bold", marginLeft: "10px" }}>
                    🌈 예약 히스토리
                </span>
            </div>

            {reservationHistory.length > 0 ? (
                <div>
                    {reservationHistory.map((reservation, index) => (
                        <div
                            key={index}
                            style={{
                                margin: "0 20px 10px 20px",
                                padding: "20px",
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                            }}
                        >
                            <p style={{fontSize: "20px", fontWeight: "bold"}}>{formatDate(reservation.date)} {reservation.time}</p>
                            <p>{storeNames[reservation.storeId]}</p>
                            <p style={{color: "lightgray"}}>{productNames[reservation.productId] || "상품 정보를 가져오는 중..."}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>이전 예약 내역이 없습니다.</p>
            )}
        </div>
    );
}

export default ReservationHistory;