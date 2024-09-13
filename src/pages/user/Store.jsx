import React from "react";
import { Link, useLocation } from "react-router-dom";
import UserMainHeader from "../../components/UserMainHeader";
import { images } from "../../utils/images";

const Store = () => {
  const location = useLocation();
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
