import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import UserMainHeader from "../../components/UserMainHeader";
import API from "../../utils/axios";
import { images } from "../../utils/images";
import { FaArrowRight } from "react-icons/fa6";
import emptyHeart from "../../utils/heart.png";
import filledHeart from "../../utils/red heart.png";
import { useLogin } from "../../context/LoginContext";

const Store = () => {
  const location = useLocation();
  const param = useParams();
  const urlStoreId = param.storeId;

  const { storeListId, storeName } = location.state || {};
  const [store, setStore] = useState([]);
  const [closeDay, setCloseDay] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const { member, heart, setHeart } = useLogin();

  const convertCloseDayToWeekdays = (closeDay) => {
    if (!closeDay) {
      return "정보 없음";
    }

    const daysOfWeek = ["월", "화", "수", "목", "금", "토", "일"];
    const dayNumbers = closeDay.split(",").map((day) => day.trim());
    const closeDays = dayNumbers.map(
      (dayNumber) => daysOfWeek[parseInt(dayNumber, 10)]
    );
    return closeDays.join(", ");
  };

  // const handleStoreInfo = () => {
  //   API.get(`/store/${storeListId}`)
  //     .then((response) => {
  //       const data = response.data;
  //       setStore(data);
  //       setCloseDay(convertCloseDayToWeekdays(data.closeDay));
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching stores:", error);
  //     });
  // };

  // useEffect(() => {
  //   handleStoreInfo();
  // }, []);

  useEffect(() => {
    if (member.isLoggedIn && member) {
      // Bookmark 정보를 가져와서 확인
      API.get(`/bookmark`)
        .then((response) => {
          const bookmarkList = response.data;

          // Bookmark 리스트에서 현재 스토어가 있는지 확인
          const found = bookmarkList.find(
            (bookmark) =>
              bookmark.store_id === parseInt(urlStoreId) &&
              bookmark.member_id === member.id
          );

          // Bookmark가 있으면 true, 없으면 false로 설정
          if (found) {
            setHeart(true);
          } else {
            setHeart(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching bookmark stores:", error);
        });
    }
  }, [urlStoreId, member, member.isLoggedIn]);

  const checkStoreIdInLocalStorage = (id) => {
    // 로컬 스토리지에서 'heart' 배열을 가져옴 (없으면 빈 배열로 처리)
    const storedHeart = JSON.parse(localStorage.getItem("heart")) || [];

    // store_id가 heart 배열에 있는지 확인
    return storedHeart.includes(id);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/store/${storeListId}`)
      .then((response) => response.json())
      .then((data) => {
        setStore(data);
        console.log(data);
        setCloseDay(data.closeDay);
      })
      .catch((error) => console.error("Error: ", error));

    const isStoreInHeart = checkStoreIdInLocalStorage(urlStoreId);
    setHeart(isStoreInHeart);
  }, []);

  const toggleFavorite = () => {
    const store_id = urlStoreId;
    const member_id = member.id;

    // 로컬 스토리지에서 'heart' 배열을 가져옴 (없으면 빈 배열로 처리)
    const storedHeart = JSON.parse(localStorage.getItem("heart")) || [];

    // 배열에 store_id가 있는지 확인
    const index = storedHeart.indexOf(store_id);
    console.log(index);

    if (index === -1) {
      // store_id가 배열에 없으면 추가
      storedHeart.push(store_id);
      setHeart(true);
    } else {
      // store_id가 배열에 있으면 제거
      storedHeart.splice(index, 1);
      setHeart(false);
    }

    // 배열을 로컬 스토리지에 다시 저장
    localStorage.setItem("heart", JSON.stringify(storedHeart));

    // if (isFavorite) {
    //   // 즐겨찾기 해제
    //   fetch(`http://localhost:8080/bookmark`, {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ memberID: member_id, storeID: store_id }),
    //   })
    //     .then((response) => response.json())
    //     .then(() => {
    //       alert("즐겨찾기가 해제되었습니다.");
    //       setIsFavorite(false); // 빈 하트로 변경
    //     })
    //     .catch((error) => console.log("Error: ", error));
    // } else {
    //   // 즐겨찾기 등록
    //   const bookmarkData = {
    //     storeID: store_id,
    //     memberID: member_id,
    //   };

    //   fetch("http://localhost:8080/bookmark", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(bookmarkData),
    //   })
    //     .then((response) => response.json())
    //     .then(() => {
    //       alert("즐겨찾기에 등록되었습니다.");
    //       setIsFavorite(true); // 빨간 하트로 변경
    //     })
    //     .catch((error) => console.log("Error: ", error));
    // }
  };
  return (
    <div>
      <UserMainHeader center={store.store} />

      <div className="w-10/12 mx-auto text-md" style={{ marginTop: "10px" }}>
        <div className=" max-h-60vh overflow-y-auto">
          <img src={images.nailStore} alt="" />
          <div className="flex items-center justify-end my-3 mr-1">
            매장 찜하기
            <img
              className="ml-2"
              src={heart ? filledHeart : emptyHeart}
              alt="favorite"
              onClick={toggleFavorite}
              style={{ width: "30px", height: "30px", cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="p-8 text-lg">
          <div className="mb-4">
            📢 소개 <br />
            {store.content}
          </div>
          <div className="mb-4">📍 위치 | {store.address}</div>
          <div className="mb-4">
            🕐 영업 시간 | {store.openTime} ~ {store.closeTime}
          </div>
          <div className="mb-4">💤 휴무일 | {closeDay}</div>

          <Link
            className="flex items-center justify-end"
            to={`/category/${urlStoreId}/menus`}
            state={{ storeId: store.id, storeName: store.store }} // state는 to 바깥에서 전달
          >
            매장 예약하기
            <FaArrowRight className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Store;
