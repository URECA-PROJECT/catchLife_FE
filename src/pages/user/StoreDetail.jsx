import React, { useEffect, useState } from "react";
import UserMainHeader from "../../components/UserMainHeader";
import { Link, useLocation, useParams } from "react-router-dom";
import { images } from "../../utils/images";
import API from "../../utils/axios";
import { BiPointer } from "react-icons/bi";
import { useLogin } from "../../context/LoginContext";

const StoreDetail = () => {
  const location = useLocation();
  const param = useParams();
  const urlStoreId = param.storeId;
  const [products, setProducts] = useState([]);
  const { storeId, storeName } = location.state || {};
  const { isLoggedIn } = useLogin();

  const handleStoreMenu = () => {
    // 해당 매장의 모든 메뉴들 불러오기
    API.get(`/products/${storeId}`)
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
      <UserMainHeader center={storeName} />

      <div className="grid grid-cols-2 gap-5 w-[90%] mx-auto max-h-[80vh] overflow-y-scroll" style={{marginTop: "20px"}}>
        {products.map((product) => (
          <div key={product.id}>
            <Link
              to={isLoggedIn ? `/order/${urlStoreId}/${product.id}` : "/login"}
              state={{ productId: product.id, storeId: storeId }} // state는 to 바깥에서 전달
            >
              <div className="border p-3 rounded-xl">
                <img src={images.cakeStore} alt="" className="rounded-xl" />
                <div>
                  <div className="text-start mt-2">
                    <div>{product.name}</div>
                    {/* <div className="text-xs break-keep">{product.description}</div> */}
                    <div>{product.price}원</div>
                  </div>
                  <div className="text-end mt-1">
                    <div className="flex items-center justify-end">
                      예약하기
                      <BiPointer className="ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreDetail;
