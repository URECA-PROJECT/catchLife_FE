import React, { useEffect, useState } from 'react';
import '../../css/yewon.css'
import { useLocation, useNavigate } from 'react-router-dom';
import OrderManagement from '../../components/OrderManagement';
import MenuManagement from '../../components/MenuManagement';
function StoreManagement(props) {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('orders'); 
    const location = useLocation();
    const store = location.state.store;

    return (
        <div>
            <div className='back-header'>
                <button className='backbutton' onClick={() => navigate('/mypage')}>←</button>
                {/* <a className='backbutton' onClick={handleBackClick}>←</a> */}
                <span className='back-header-top'>프로필 수정</span>
            </div>

            <div className="tab-menu">
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
            {activeTab==='orders' ? <OrderManagement storeID={store.id} /> : <MenuManagement storeID={store.id} storeName={store.store} categoryDetailID={store.categoryDetailId} />}
        </div>
    );
}

export default StoreManagement;