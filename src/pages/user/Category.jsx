import React from "react";
import { Link, useLocation } from "react-router-dom";
import { images } from "../../utils/images";
import "../../css/Main.css";
import UserMainHeader from "../../components/UserMainHeader";

const Category = () => {
  const location = useLocation();

  const pathSegments = location.pathname.split("/");
  const category = pathSegments[pathSegments.length - 1];

  return (
    <div>
      <UserMainHeader title={category} />
      <div className="CategoryListBox">
        <Link to="pococake">
          <div className="CategoryStore" key="pococake">
            <img src={images.cakeStore} alt="케이크" />
            <div className="storeContent">
              <div>가게명</div>
              <div>가게 설명</div>
            </div>
          </div>
        </Link>

        <Link to="seungheeCake">
          <div className="CategoryStore" key="pococake">
            <img src={images.cakeStore} alt="케이크" />
            <div className="storeContent">
              <div>가게명</div>
              <div>가게 설명</div>
            </div>
          </div>
        </Link>

        <Link to="urecaCake">
          <div className="CategoryStore" key="pococake">
            <img src={images.cakeStore} alt="케이크" />
            <div className="storeContent">
              <div>가게명</div>
              <div>가게 설명</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Category;
