import React from "react";
import { Link, useLocation } from "react-router-dom";
import UserMainHeader from "../../components/UserMainHeader";
import { images } from "../../utils/images";

const Store = () => {
  const location = useLocation();
  const { storeId } = location.state || {}; // state가 없으면 빈 객체로 대처

  console.log(storeId, "id"); // 여기서 storeId가 제대로 나오는지 확인
  const pathSegments = location.pathname.split("/");
  const store = pathSegments[pathSegments.length - 1];

  return (
    <div>
      <UserMainHeader title={store} />

      <div className="gridBox">
        <div className="gridItem">
          <Link to="birth">
            <img src={images.cakeStore} alt="" />
            <div>생일 케이크</div>
          </Link>
        </div>

        <div className="gridItem">
          <Link to="birth">
            <img src={images.cakeStore} alt="" />
            <div>생일 케이크</div>
          </Link>
        </div>

        <div className="gridItem">
          <Link to="birth">
            <img src={images.cakeStore} alt="" />
            <div>생일 케이크</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Store;
