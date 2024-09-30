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
                const storeIds = data.map(reservation => reservation.storeID);
                const productIds = data.map(reservation => reservation.productID);

                const fetchStoreNames = storeIds.map(id =>
                    fetch(`http://localhost:8080/storelist/${id}`).then(res => res.json())
                );

                const fetchProductNames = productIds.map(id =>
                    fetch(`http://localhost:8080/products/${id}`).then(res => res.json())
                );

                const storeResults = await Promise.all(fetchStoreNames);
                const productResults = await Promise.all(fetchProductNames);

                const storeNamesMap = {};
                const productNamesMap = {};

                storeResults.forEach((store, index) => {
                    storeNamesMap[storeIds[index]] = store.store;
                });

                productResults.forEach((product, index) => {
                    productNamesMap[productIds[index]] = product.name;
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

    console.log(reservationHistory)

    return (
        <div style={{ borderTop: "1px solid #eee" }}>
            <div style={{ margin: "10px", padding: "10px" }}>
                <span style={{ fontSize: "25px", fontWeight: "bold", marginLeft: "10px" }}>
                    예약 히스토리
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
                            <p><strong>예약일자:</strong> {reservation.date}</p>
                            <p><strong>예약시간:</strong> {reservation.time}</p>
                            <p><strong>매장:</strong> {storeNames[reservation.storeId] || "매장 정보를 가져오는 중..."}</p>
                            <p><strong>상품:</strong> {productNames[reservation.productId] || "상품 정보를 가져오는 중..."}</p>
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