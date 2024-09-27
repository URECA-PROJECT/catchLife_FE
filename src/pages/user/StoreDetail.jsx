import React, { useEffect, useState } from "react";
import UserMainHeader from "../../components/UserMainHeader";
import { Link, useLocation } from "react-router-dom";
import { images } from "../../utils/images";
import API from "../../utils/axios";

const StoreDetail = () => {
  const location = useLocation();
  const { storeId, storeName } = location.state || {};
  const [products, setProducts] = useState([]);

  const handleStoreMenu = () => {
    // 해당 매장의 모든 메뉴들 불러오기
    API.get(`/products/store/${storeId}`)
      .then((response) => {
        const data = response.data;
        setProducts(data);
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
        {products.map((product) => (
          <div className="gridItem" key={product.id}>
            <Link
              to={`/order`}
              state={{ productId: product.id, storeId: storeId }} // state는 to 바깥에서 전달
            >
              <img src={images.cakeStore} alt="" />
              <div>
                <div>{product.name}</div>
                <div>{product.description}</div>
                <div>{product.price}원</div>
                <button>주문하기</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreDetail;
