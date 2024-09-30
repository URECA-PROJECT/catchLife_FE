import React, { useEffect, useState } from 'react';

function MenuManagement(props) {
    const { storeID, storeName, categoryDetailID } = props;

    const [menuList, setMenuList] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newMenu, setNewMenu] = useState({
        name: '',
        price: '',
        description: ''
    });

    // 초기 메뉴 목록 불러오기
    useEffect(() => {
        fetch(`http://localhost:8080/products/${storeID}`)
            .then(response => response.json())
            .then(data => setMenuList(data))
            .catch(error => console.error('Error:', error));
    }, [storeID]);

    // 메뉴 추가
    const handleAddMenu = () => {
        const formData = {
            storeId: storeID,
            categoryDetailId: categoryDetailID,
            name: newMenu.name,
            price: parseFloat(newMenu.price),
            description: newMenu.description
        };
    
        fetch('http://localhost:8080/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(() => {
            // 전체 메뉴 목록 다시 불러오기
            fetch(`http://localhost:8080/products/${storeID}`)
                .then(response => response.json())
                .then(data => setMenuList(data))
                .catch(error => console.error('Error:', error));
    
            setNewMenu({ name: '', price: '', description: '' });
            setIsFormVisible(false);  // 입력폼 닫기
        })
        .catch(error => console.error('Error:', error));
    };

    // 메뉴 삭제
    const handleDeleteMenu = (productId) => {
        if (window.confirm("삭제하시겠습니까?")) {
            fetch(`http://localhost:8080/products/${productId}`, {
                method: 'DELETE'
            })
            .then(() => {
                setMenuList(prevMenuList => prevMenuList.filter(menu => menu.id !== productId));
            })
            .catch(error => console.error('Error:', error));
        }
    };

    return (
        <div style={{borderTop: "1px solid #eee"}}>

            {/* 메뉴 추가 버튼 */}
            <div className='btn-block-reservations' style={{ display: "flex", justifyContent: "right" }}>
                <button onClick={() => setIsFormVisible(true)} class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
                    style={{margin: "10px 20px 0 0", textAlign: "center", fontSize: "20px"}}>+ 메뉴 추가</button>
            </div>

            {/* 입력폼 */}
            {isFormVisible && (
                <div class="w-full">
                    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">메뉴명</label>
                            <input onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={newMenu.name} type="text" placeholder="메뉴명" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">가격</label>
                            <input onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={newMenu.price} type="number" placeholder="가격" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">설명</label>
                            <input onChange={(e) => setNewMenu({ ...newMenu, description: e.target.value })}  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={newMenu.description} type="textarea" placeholder="설명" />
                        </div>
                    
                    
                    
                    <div class="flex items-center justify-center space-x-4">
                        <button onClick={handleAddMenu} class="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">추가</button>
                        <button onClick={() => setIsFormVisible(false)} class="bg-white text-black border border-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">취소</button>
                    </div>
                    </form>
                </div>
            )}

                {menuList.map(menu => (
                    <div className='menu-container' style={{border: "1px solid black", borderRadius: "10px", margin: "20px", padding: "0 5px 0 5px", height: "fit-content"}}>
                        <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700" style={{padding: "10px"}}>
                            <div class="flex flex-col pb-2" style={{ lineHeight: "1", padding: "5px 0" }}>
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">메뉴</dt>
                                <dd class="text-lg font-semibold">{menu.name}</dd>
                            </div>
                            <div class="flex flex-col py-2" style={{ lineHeight: "1", padding: "5px 0" }}>
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">가격</dt>
                                <dd class="text-lg font-semibold">{menu.price}</dd>
                            </div>
                            <div class="flex flex-col pt-2" style={{ lineHeight: "1", padding: "5px 0" }}>
                                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">설명</dt>
                                <dd class="text-lg font-semibold">{menu.description}</dd>
                            </div>
                        </dl>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <button class="bg-black text-white py-1 px-4 border border-gray-400 rounded shadow" style={{width: "100%", marginBottom: "3px", borderRadius: "15px", margin: "0 10px 10px 10px"}} onClick={() => handleDeleteMenu(menu.id)}>삭제</button>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default MenuManagement;