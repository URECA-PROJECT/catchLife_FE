import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../utils/images";
import { useLogin } from "../../context/LoginContext";
import API from "../../utils/axios";

const FavoriteStore = () => {
  const { isLoggedIn, member } = useLogin(); 
  const [favoriteStores, setFavoriteStores] = useState([]); 
  
  const fetchFavoriteStores = () => {
    API.get(`/bookmark`) 
      .then((response) => {
        console.log(response.data); 
        setFavoriteStores(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching favorite stores:", error);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      console.log("member.id:", member.id);
      fetchFavoriteStores(); 
    }
  }, [isLoggedIn]);

  return (
    <>
      {isLoggedIn ? (
        <div className="subTitle">❤️ 내가 즐겨찾는 매장</div>
      ) : (
        <div className="subTitle">❤️ 최근 인기 가게</div>
      )}
      <div className="grid grid-cols-3 w-[90%] mx-auto">
        {favoriteStores.length > 0 ? (
          favoriteStores.map((store) => (
            <Link to={`/store/${store.id}`} key={store.id} className="m-5 flex">
              <div className="text-center">
                <img src={images.nailStore} alt="" className="rounded-xl" />
                <div className="text-sm mt-2">{store.storeName}</div> 
              </div>
            </Link>
          ))
        ) : (
          <div>즐겨찾기한 매장이 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default FavoriteStore;
