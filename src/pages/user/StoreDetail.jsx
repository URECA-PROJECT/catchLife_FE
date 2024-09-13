import React from "react";
import UserMainHeader from "../../components/UserMainHeader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { images } from "../../utils/images";

const StoreDetail = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const detail = pathSegments[pathSegments.length - 1];

  const navigate = useNavigate();
  const nextPage = () => {
    navigate("order", {
      state: { key: "key", price: "20,000원", title: "케이크", img: "img" },
    });
  };

  return (
    <div>
      <UserMainHeader title={detail} />

      <Link to="custom">
        <div className="customBtn">커스텀 케이크 주문하기</div>
      </Link>

      <div className="gridBox">
        <div className="gridItem" key="1">
          <button onClick={nextPage}>
            <img src={images.cakeStore} alt="" />
            <div>
              <div>가격</div>
              <div>케이크종류</div>
              <div>주문하기</div>
            </div>
          </button>
        </div>

        <div className="gridItem">
          <button onClick={nextPage}>
            <img src={images.cakeStore} alt="" />
            <div>
              <div>가격</div>
              <div>케이크종류</div>
              <div>주문하기</div>
            </div>
          </button>
        </div>

        <div className="gridItem">
          <button onClick={nextPage}>
            <img src={images.cakeStore} alt="" />
            <div>
              <div>가격</div>
              <div>케이크종류</div>
              <div>주문하기</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
