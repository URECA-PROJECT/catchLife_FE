import React, { useEffect, useState } from "react";
import UserMainHeader from "../../components/UserMainHeader";
import { useLocation } from "react-router-dom";
import { images } from "../../utils/images";
import API from "../../utils/axios";

const StoreDetail = () => {
  const location = useLocation();
  const { storeId, storeName } = location.state || {};
  const [menus, setMenus] = useState([]);

  const handleStoreMenu = () => {
    API.get(`/products/store/${storeId}`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setMenus(data);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };

  useEffect(() => {
    handleStoreMenu();
  }, []);

  return (
    <div>
      <UserMainHeader title={storeName} />

      <div className="gridBox">
        {menus.map((menu) => (
          <div className="gridItem" key="1">
            <button onClick={console.log("주문서 페이지로 이동")}>
              <img src={images.cakeStore} alt="" />
              <div>
                <div>{menu.name}</div>
                <div>{menu.description}</div>
                <div>{menu.price}원</div>
                <button>주문하기</button>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreDetail;
