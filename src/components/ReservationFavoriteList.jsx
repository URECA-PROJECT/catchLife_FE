import "../css/yewon.css";
import React, { useEffect, useState } from "react";
import myReservation from "../utils/mockData/myReservation.json";
import { useLogin } from "../context/LoginContext";
import { Link } from "react-router-dom";

function ReservationFavoriteList(props) {
  // props로 받아올 것

  const [activeTab, setActiveTab] = useState("reservations"); // '다가오는 예약', '즐겨찾는 매장' 탭 상태
  const [bookmarkList, setBookmarkList] = useState([]); // bookmarkList를 상위 컴포넌트에서 관리

  const { member } = useLogin(); // 로그인된 사용자 정보
  const memberId = member.id; // 전역 변수에서 가져와야 함

  // 즐겨찾기 목록 가져오기
  useEffect(() => {
    fetch("http://localhost:8080/bookmark")
      .then((response) => response.json())
      .then((data) => {
        const filteredBookmarks = data.filter((bm) => bm.memberID == memberId); // 로그인된 사용자 ID와 일치하는 항목만 필터링
        setBookmarkList(filteredBookmarks); // 필터링된 bookmarkList 저장
      })
      .catch((error) => console.error("Error: ", error));
  }, [memberId]);
  return (
    <div>
      <div className="tab-menu">
        <button
          className={activeTab === "reservations" ? "active" : ""}
          onClick={() => setActiveTab("reservations")}
          style={{fontSize: "25px"}}
        >
          다가오는 예약
        </button>
        <button
          className={activeTab === "favorites" ? "active" : ""}
          onClick={() => setActiveTab("favorites")}
          style={{fontSize: "25px"}}
        >
          즐겨찾는 매장 {bookmarkList.length} {/* 즐겨찾는 매장 개수 표시 */}
        </button>
      </div>

      {/* 탭에 따라 내용 다르게 렌더링 */}
      {activeTab === "reservations" ? (
        <ReservationList />
      ) : (
        <FavoritesList bookmarkList={bookmarkList} />
      )}
    </div>
  );
}

function ReservationList() {
  const { member } = useLogin();
  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [storeNames, setStoreNames] = useState({});
  const [productNames, setProductNames] = useState({});
  
  useEffect(() => {
      const fetchUpcomingReservations = async () => {
          try {
              const response = await fetch(`http://localhost:8080/orders/upcoming/${member.id}`);
              const data = await response.json();
              setUpcomingReservations(data);
              
              // 매장명과 상품명을 동시에 가져오는 로직
              const storeIds = data.map(reservation => reservation.storeId);
              const productIds = data.map(reservation => reservation.productId);

              const fetchStoreNames = storeIds.map(id =>
                  fetch(`http://localhost:8080/storelist/${id}`).then(res => res.json())
              );

              const fetchProductNames = productIds.map(id =>
                  fetch(`http://localhost:8080/products/list/${id}`).then(res => res.json())
              );

              const storeResults = await Promise.all(fetchStoreNames);
              const productResults = await Promise.all(fetchProductNames);

              const storeNamesMap = {};
              const productNamesMap = {};

              // store와 product 데이터를 맵핑해서 저장
              storeResults.forEach((store, index) => {
                  if (store && store.store) {
                      storeNamesMap[storeIds[index]] = store.store;
                  }
              });


              productResults.forEach((product, index) => {
                  if (product && product.name) {
                      productNamesMap[productIds[index]] = product.name;
                  }
              });

              setStoreNames(storeNamesMap);
              setProductNames(productNamesMap);
          } catch (error) {
              console.error("Error fetching upcoming reservations:", error);
          }
      };

      if (member.id) {
          fetchUpcomingReservations();
      }
  }, [member.id]);

  // 날짜를 한국어 형식으로 변환하는 함수
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
  };

  return (
      <div>
          {upcomingReservations.length > 0 ? (
              upcomingReservations.map((reservation, index) => (
                  <div key={index} style={{
                    margin: "20px",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                }}>
                      <p style={{fontSize: "20px", fontWeight: "bold"}}>{formatDate(reservation.date)} {reservation.time}</p>
                      <p>{storeNames[reservation.storeId]}</p>
                      <p style={{color: "lightgray"}}>{productNames[reservation.productId]}</p>
                  </div>
              ))
          ) : (
              <p>다가오는 예약이 없습니다.</p>
          )}
      </div>
  );
}

function FavoritesList({ bookmarkList }) {
  const [storeDetailsList, setStoreDetailsList] = useState([]);

  // storeID에 해당하는 store 또는 store_list 정보 가져오기
  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        // bookmarkList가 비어있지 않으면 storeID들만 가져와서 storeList와 비교
        if (bookmarkList.length > 0) {
          const storeIDs = bookmarkList.map((bm) => bm.storeID);

          // storeID에 해당하는 storelist 테이블에서 정보 가져오기
          const storeResponses = await Promise.all(
            storeIDs.map((storeID) =>
              fetch(`http://localhost:8080/storelist`)
                .then((response) => response.json())
                .then((storeList) => {
                  // storelist에서 storeID와 일치하는 store 찾기
                  return storeList.find((store) => store.id === storeID);
                })
                .catch((error) => console.error("Error: ", error))
            )
          );

          // storeResponses에 각 storeID에 해당하는 store 정보를 저장
          setStoreDetailsList(storeResponses);
        }
      } catch (error) {
        console.error("Error fetching store details:", error);
      }
    };

    fetchStoreDetails();
  }, [bookmarkList]);

  return (
    <div>
      {storeDetailsList.map((store, index) => (
        <Link to={`/category/${store.id}`} state={{storeListId: store.id}}>
          <div className="favorite-items" key={index} style={{ border: "3px solid black" }}>
            <li style={{ fontSize: "20px" }}>{store.store}</li> {/* store 이름을 표시 */}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ReservationFavoriteList;
