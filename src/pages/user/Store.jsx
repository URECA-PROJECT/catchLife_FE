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

  const handleStoreInfo = () => {
    API.get(`/store/${storeListId}`)
      .then((response) => {
        const data = response.data;
        setStore(data);
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
        <div className="p-8">
          <div className="mb-4">소개 | {store.content}</div>
          <div className="mb-4">위치 | {store.address}</div>
          <div className="mb-4">휴무일 | {store.openDay}</div>
          <div className="mb-4">
            영업 시간 | {store.openTime} ~ {store.closeTime}
          </div>

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
