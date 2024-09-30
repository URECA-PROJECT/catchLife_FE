import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../utils/images";
import { useLogin } from "../../context/LoginContext";
import API from "../../utils/axios";

const FavoriteStore = () => {
  const { isLoggedIn, member } = useLogin();
  const [favoriteStores, setFavoriteStores] = useState([]);
  const [storeDetailsList, setStoreDetailsList] = useState([]);

  const [heartStore, setHeartStore] = useState([]);

  const handleAllStore = () => {
    API.get("/storelist")
      .then((response) => {
        console.log(response.data);
        // 모든 매장 정보 조회
        const storeAllData = response.data;

        // 즐겨찾기한 매장id 조회
        const storedHeart = JSON.parse(localStorage.getItem("heart")) || [];
        console.log(storedHeart, "즐겨찾기한 매장 번호");

        // storedHeart 배열의 모든 요소를 정수로 변환
        const heartedStoreIds = storedHeart.map((id) => parseInt(id, 10));

        // heartedStoreIds 배열에 있는 매장의 id와 일치하는 매장만 필터링
        const heartedStores = storeAllData.filter((store) =>
          heartedStoreIds.includes(store.id)
        );

        console.log(heartedStores, "즐겨찾기한 매장 정보");

        setHeartStore(heartedStores);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };

  const fetchFavoriteStores = () => {
    API.get(`/bookmark`)
      .then((response) => {
        setFavoriteStores(response.data);
      })
      .catch((error) => {
        console.error("Error fetching favorite stores:", error);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchFavoriteStores();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    handleAllStore();
  }, []);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        // bookmarkList가 비어있지 않으면 storeID들만 가져와서 storeList와 비교
        if (favoriteStores.length > 0) {
          const storeIDs = favoriteStores.map((fs) => fs.storeID);

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
  }, [favoriteStores]);

  return (
    <>
      <div>
        {isLoggedIn ? (
          <div className="subTitle" style={{ fontSize: "20px" }}>
            ❤️ 내가 즐겨찾는 매장
          </div>
        ) : (
          <div className="subTitle" style={{ fontSize: "20px" }}>
            ❤️ 최근 인기 가게
          </div>
        )}
        <div
          className="grid grid-cols-3 w-[90%] mx-auto"
          style={{
            border: "1px solid #eee",
            marginTop: "10px",
            padding: "0 5px 10px 5px",
            borderRadius: "20px",
          }}
        >
          {/* <div> */}
          {heartStore?.length > 0 ? (
            heartStore.map((store) => {
              console.log(store, "매장");
              return (
                <Link
                  to={`/category/${store.id}`}
                  state={{ storeListId: store.id }}
                  key={store.storeID}
                  className="m-5 flex"
                >
                  <div className="text-center">
                    <img src={images.nailStore} alt="" className="rounded-xl" />
                    <div className="text-sm mt-2">{store.store}</div>{" "}
                    {/* 매장 이름 출력 */}
                  </div>
                </Link>
              );
            })
          ) : (
            <div
              style={{
                width: "100%",
                margin: "10px 30px 5px",
                whiteSpace: "nowrap",
              }}
            >
              즐겨찾는 매장이 없습니다.
            </div>
          )}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default FavoriteStore;
