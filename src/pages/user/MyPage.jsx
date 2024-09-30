import React, { useEffect, useState } from "react";
import ProfileHeader from "../../components/ProfileHeader";
import ReservationFavoriteList from "../../components/ReservationFavoriteList";
import StoreList from "../../components/StoreList";
import "../../css/yewon.css";
import { useLogin } from "../../context/LoginContext";
import ReservationHistory from "../../components/ReservationHistory";

function MyPage(props) {
    const { member } = useLogin();
    const [role, setRole] = useState();

    useEffect(() => {
        setRole(localStorage.getItem("role"));
    }, []);

    return (
        <div>
            <ProfileHeader
                isAdmin={role === "admin"}
                memberNum={member.id}
                name={member.name}
                phone={member.phone}
                password={member.password}
            />
            {/* 일반 유저면 예약 매장 목록을, 관리자면 내 매장 목록을 표시 */}
            {role === "admin" ? (
                <StoreList memberNum={member.id} />
            ) : (
                <ReservationFavoriteList />
            )}

            {role === "user" ? (
                <ReservationHistory />
            ) : (<></>)}
        </div>
    );
}

export default MyPage;
