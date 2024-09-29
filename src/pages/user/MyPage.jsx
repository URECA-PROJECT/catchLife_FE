import React, { useEffect, useState } from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import ReservationFavoriteList from '../../components/ReservationFavoriteList';
import StoreList from '../../components/StoreList';
import '../../css/yewon.css'

function MyPage(props) {

    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const memberNum = 5; // 고유 번호

    useEffect(() => {
        fetch(`http://localhost:8080/members/${memberNum}`)
        .then(response => response.json())
        .then(data => {
            setName(data.name);
            setRole(data.role);
            setPhone(data.phone);
            setPassword(data.password)
        })
        .catch(error => console.error('Error fetching member', error));
    }, [memberNum]);


    return (
        <div>
            <ProfileHeader isAdmin={role==='admin'} memberNum={memberNum} name={name} phone={phone} password={password}/>
            {/* 일반 유저면 예약 매장 목록을, 관리자면 내 매장 목록을 표시 */}
            {role==='admin'? (<StoreList memberNum={memberNum} />) : (<ReservationFavoriteList />)}
            
        </div>
    );
}

export default MyPage;