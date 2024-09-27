import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserMainHeader from "../../components/UserMainHeader";
import API from "../../utils/axios";

const Store = () => {
  const location = useLocation();
  const { storeListId, storeName } = location.state || {}; // state가 없으면 빈 객체로 대처
  const [store, setStore] = useState([]);

  const handleStoreInfo = () => {
    API.get(`/store/${storeListId}`)
      .then((response) => {
        const data = response.data;
        setStore(data);
      })
      .then(() => {
        console.log(store.id, "여기도 들어와야되는거아냐?");
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };

  useEffect(() => {
    console.log("storeListId", storeListId);
    console.log("storeId", store.id);
    handleStoreInfo();
  }, []);

  return (
    <div>
      <UserMainHeader title={storeName} />

      <div>
        <div>{store.store}</div>
        <div>사진</div>
        <div>{store.content}</div>
        <div>{store.address}</div>
        <div>{store.openDay}</div>
        <div>
          오픈 시간 : {store.openTime} ~ {store.closeTime}
        </div>
      </div>
      <Link
        to={`/category/${storeListId}/detail`}
        state={{ storeId: store.id, storeName: storeName }} // state는 to 바깥에서 전달
      >
        매장 더보기
      </Link>
    </div>
  );
};

export default Store;
