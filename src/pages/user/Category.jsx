import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../utils/images";
import "../../css/Main.css";
import UserMainHeader from "../../components/UserMainHeader";
import { useCategory } from "../../context/CategoryContext";

const Category = () => {
  const { stores } = useCategory();

  return (
    <div>
      <UserMainHeader title={"dd"} />
      <div className="CategoryListBox">
        {stores.map((s) => (
          <Link
            to={`/category/${s.storeId}`}
            state={{ storeListId: s.storeId, storeName: s.storeName }} // state는 to 바깥에서 전달
            key={s.storeId}
          >
            <div className="CategoryStore">
              <img src={images.cakeStore} alt="케이크" />
              <div className="storeContent">
                <div>{s.storeName}</div>
                <div>지역 : {s.regionName}</div>
                <div>카테고리 : {s.categoryDetailName}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
