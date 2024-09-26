import React, { useState } from 'react';
import '../../css/yewon.css'
import { useNavigate } from 'react-router-dom';
import OrderManagement from '../../components/OrderManagement';
import MenuManagement from '../../components/MenuManagement';
function StoreManagement(props) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('orders'); 

    return (
        <div>
            <div className='back-header'>
                <a href='#' className='backbutton' onClick={() => navigate(-1)}>←</a>
                <span className='back-header-top'>매장 관리</span>
            </div>

            <div className="tab-menu" style={{borderTop: "1px solid #eee"}}>
                <button className={activeTab === 'orders' ? 'active' : ''}
                    onClick={() => setActiveTab('orders')}>
                    주문서 관리
                </button>
                <button className={activeTab === 'menus' ? 'active' : ''}
                    onClick={() => setActiveTab('menus')}>
                    메뉴 관리
                </button>

            </div>
            {/* 탭에 따라 내용 렌더링 다르게 */}
            {activeTab==='orders' ? <OrderManagement /> : <MenuManagement />}
        </div>
    );
}

export default StoreManagement;