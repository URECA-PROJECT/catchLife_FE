import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function StoreRegister(props) {
    const location = useLocation();
    const memberId = location.state.memberNum;
    const navigate = useNavigate();

    const [storeName, setStoreName] = useState('');
    const [regions, setRegions] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryDetails, setCategoryDetails] = useState([]);
    const [selectedCategoryDetail, setSelectedCategoryDetail] = useState('');

    // 지역 목록 가져오기 
    useEffect(() => {
        fetch('http://localhost:8080/region')
        .then(response => response.json())
        .then(data => setRegions(data))
        .catch(error => console.error("Error: ", error))
    }, []);


    // 업종(대분류) 가져오기 - category
    useEffect(() => {
        fetch('http://localhost:8080/category')
        .then(response => response.json())
        .then(data => setCategories(data))
        .catch(error => console.error("Error: ", error))
    }, []);

    // 선택한 대분류에 따라 소분류 목록 가져오기 - category_detail
    useEffect(() => {
        if (selectedCategory) {
            fetch(`http://localhost:8080/categoryDetail/${selectedCategory}`)
            .then(response => response.json())
            .then(data => setCategoryDetails(data))
            .catch(error => console.error("Error: ", error))
        }
    }, [selectedCategory]);

    // 매장 등록 처리
    function handleRegister() {
        if (!storeName || !selectedRegion || !selectedCategory || !selectedCategoryDetail) {
            alert("빈칸을 모두 입력해주세요.")
            return;
        }

        const requestData = {
            memberId,
            store: storeName,
            regionId: selectedRegion,
            categoryId: selectedCategory,
            categoryDetailId: selectedCategoryDetail
        };

        fetch('http://localhost:8080/storelist/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestData),
        })
            .then(response => response.json())
            .then(() => {
                alert('매장이 성공적으로 등록되었습니다.');
                navigate('/mypage');
            })
            .catch(error => console.log("Error: ", error))
        }

    return (
        <div>
            <div className='back-header'>
                <button className='backbutton' onClick={() => navigate('/mypage')}>←</button>
                {/* <a className='backbutton' onClick={handleBackClick}>←</a> */}
                <span className='back-header-top'>프로필 수정</span>
            </div>

            <div>
                <label>매장명</label>
                <input type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
            </div>
            <div>
                <label>지역</label>
                <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
                    <option value="">지역을 선택하세요</option>
                    {regions.map(region => (
                        <option key={region.id} value={region.id}>{region.zone} {region.city}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>업종(대분류)</label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">업종을 선택하세요</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>업종(소분류)</label>
                <select value={selectedCategoryDetail} onChange={(e) => setSelectedCategoryDetail(e.target.value)}>
                    <option value="">세부업종을 선택하세요</option>
                    {categoryDetails.map(detail => (
                        <option key={detail.id} value={detail.id}>{detail.name}</option>
                    ))}
                </select>
            </div>
            
            <div className="flex justify-center space-x-4 mt-6">
                {/* 저장 버튼 */}
                <button
                    onClick={() => {
                        const userConfirmed = window.confirm('저장하시겠습니까?');

                        if (userConfirmed) {
                            // '확인'을 누르면 서버로 양식 전송
                            handleRegister();
                        } else {
                            // '취소' 누르면 알림창 닫힘
                        }
                    }}
                    className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
                >
                    저장
                </button>

                {/* 취소 버튼 */}
                <button
                    onClick={() => navigate(-1)}
                    className="border border-black text-black bg-white px-6 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300 ease-in-out"
                >
                    취소
                </button>
            </div>
            
        </div>
    );
}

export default StoreRegister;