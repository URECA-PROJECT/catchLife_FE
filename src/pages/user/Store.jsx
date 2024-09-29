import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import UserMainHeader from "../../components/UserMainHeader";
import API from "../../utils/axios";
import { images } from "../../utils/images";
import { FaArrowRight } from "react-icons/fa6";
import emptyHeart from "../../utils/heart.png";  
import filledHeart from "../../utils/red heart.png"; 


const Store = () => {
  const location = useLocation();
  const param = useParams();
  const urlStoreId = param.storeId;

  const { storeListId, storeName } = location.state || {}; // state가 없으면 빈 객체로 대처
  const [store, setStore] = useState([]);
  const [closeDay, setCloseDay] = useState("");
  const [isFavorite, setIsFavorite] = useState(false); 

  const convertCloseDayToWeekdays = (closeDay) => {
    const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
    const dayNumbers = closeDay.split(",").map((day) => day.trim());
    const closeDays = dayNumbers.map(
      (dayNumber) => daysOfWeek[parseInt(dayNumber, 10)]
    );
    return closeDays.join(", ");
  };

  const handleStoreInfo = () => {
    API.get(`/store/${storeListId}`)
      .then((response) => {
        const data = response.data;
        setStore(data);
        setCloseDay(convertCloseDayToWeekdays(data.closeDay));
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };

  useEffect(() => {
    handleStoreInfo();
  }, []);

  const toggleFavorite = () => {
    // setIsFavorite((prevState) => !prevState); 

    const store_id = 1
    const member_id = 1
  
    const bookmarkData = {
      storeID: store_id,
      memberID: member_id
  }
  
  fetch('http://localhost:8080/bookmark', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookmarkData)
  })
  .then(response => response.json())
  .then(() => {
      alert('즐겨찾기에 등록되었습니다.')
  })
  
  .catch(error => console.log("Error: ", error))
  };

  return (
    <div>
      <UserMainHeader center={storeName} />

      <div className="w-10/12 mx-auto text-md">
        <div>
          <img src={images.nailStore} alt="" />
          <div className="flex items-center justify-end mb-4">
            <img
              src={isFavorite ? filledHeart : emptyHeart} 
              alt="favorite"
              onClick={toggleFavorite} 
              style={{ width: '30px', height: '30px', cursor: 'pointer' }} 
            />
          </div>
        </div>
        <div className="p-8 text-lg">
          <div className="mb-4">📢 소개 | {store.content}</div>
          <div className="mb-4">📍 위치 | {store.address}</div>
          <div className="mb-4">
            🕐 영업 시간 | {store.openTime} ~ {store.closeTime}
          </div>
          <div className="mb-4">💤 휴무일 | {closeDay}</div>


          <Link
            className="flex items-center justify-end"
            to={`/category/${urlStoreId}/menus`}
            state={{ storeId: store.id, storeName: storeName }} // state는 to 바깥에서 전달
          >
            매장 더보기
            <FaArrowRight className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Store;
