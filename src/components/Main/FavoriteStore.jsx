import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../utils/images";
import { useLogin } from "../../context/LoginContext";
import API from "../../utils/axios";

const FavoriteStore = () => {
  const { isLoggedIn, member } = useLogin(); 
  const [favoriteStores, setFavoriteStores] = useState([]); 
  const [storeDetailsList, setStoreDetailsList] = useState([]);

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
    const fetchStoreDetails = async () => {
        try {
            // bookmarkList가 비어있지 않으면 storeID들만 가져와서 storeList와 비교
            if (favoriteStores.length > 0) {
                const storeIDs = favoriteStores.map(fs => fs.storeID);
                
                // storeID에 해당하는 storelist 테이블에서 정보 가져오기
                const storeResponses = await Promise.all(
                    storeIDs.map(storeID => 
                        fetch(`http://localhost:8080/storelist`)
                        .then(response => response.json())
                        .then(storeList => {
                            // storelist에서 storeID와 일치하는 store 찾기
                            return storeList.find(store => store.id === storeID);
                        })
                        .catch(error => console.error('Error: ', error))
                    )
                );
                
                // storeResponses에 각 storeID에 해당하는 store 정보를 저장
                setStoreDetailsList(storeResponses);
            }
        } catch (error) {
            console.error('Error fetching store details:', error);
        }
    };
    fetchStoreDetails();
}, [favoriteStores]);

  return (
    <>
      <div>
        {isLoggedIn ? (
          <div className="subTitle" style={{fontSize: "20px"}}>❤️ 내가 즐겨찾는 매장</div>
        ) : (
          <div className="subTitle" style={{fontSize: "20px"}}>❤️ 최근 인기 가게</div>
        )}
        <div className="grid grid-cols-3 w-[90%] mx-auto" style={{border: "1px solid #eee", marginTop: "10px", padding: "0 5px 10px 5px", borderRadius: "20px"}}>
          {/* <div> */}
            {storeDetailsList.length > 0 ? (
              storeDetailsList.map((store) => {
                console.log(store);
                return (
                  <Link to={`/category/${store.id}`} state={{storeListId: store.id}} key={store.storeID} className="m-5 flex">
                    <div className="text-center">
                      <img src={images.nailStore} alt="" className="rounded-xl" />
                      <div className="text-sm mt-2">{store.store}</div> {/* 매장 이름 출력 */}
                    </div>
                  </Link>
                );
              })
            ) : ( <div style={{width: "100%", margin: "10px 30px 5px", whiteSpace: "nowrap"}}>즐겨찾는 매장이 없습니다.</div>
            )}
          {/* </div> */}
        
        </div>

      </div>
    </>
  );
};

export default FavoriteStore;
