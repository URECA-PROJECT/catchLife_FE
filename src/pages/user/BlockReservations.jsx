import React from 'react';
import { useNavigate } from 'react-router-dom';

function BlockReservations(props) {

    const navigate = useNavigate();

    return (
        <div>
            <div className='back-header'>
                <button className='backbutton' onClick={() => navigate('/mypage/reservations')}>←</button>
                {/* <a className='backbutton' onClick={handleBackClick}>←</a> */}
                <span className='back-header-top'>예약 막기</span>
            </div>
        </div>
    );
}

export default BlockReservations;