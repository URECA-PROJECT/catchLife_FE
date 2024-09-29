import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import UserMainHeader from "../../components/UserMainHeader";
import API from "../../utils/axios";
import { images } from "../../utils/images";
import { FaArrowRight } from "react-icons/fa6";

const Store = () => {
  const location = useLocation();
  const param = useParams();
  const urlStoreId = param.storeId;

  const { storeListId, storeName } = location.state || {}; // state가 없으면 빈 객체로 대처
  const [store, setStore] = useState([]);
  const [closeDay, setCloseDay] = useState("");

  const convertCloseDayToWeekdays = (closeDay) => {
    // 요일 배열 (0: 월요일, 1: 화요일 ... 6: 일요일)
    const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];

    // '0, 2, 5'와 같은 문자열을 콤마로 분리하여 배열로 변환
    const dayNumbers = closeDay.split(",").map((day) => day.trim());

    console.log(dayNumbers);
    // 숫자들을 대응하는 요일로 변환
    const closeDays = dayNumbers.map(
      (dayNumber) => daysOfWeek[parseInt(dayNumber, 10)]
    );

    console.log(closeDays);

    // 변환된 요일들을 쉼표로 구분한 문자열로 반환
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

  return (
    <div>
      <UserMainHeader center={storeName} />

      <div className="w-10/12 mx-auto text-md">
        <div>
          <img src={images.nailStore} alt="" />
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
