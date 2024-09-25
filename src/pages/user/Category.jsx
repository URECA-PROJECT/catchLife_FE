import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../utils/images";
import "../../css/Main.css";
import UserMainHeader from "../../components/UserMainHeader";
import { useCategory } from "../../context/CategoryContext";

const Category = () => {
  const { stores } = useCategory();
  const title = stores[0].categoryName;

  return (
    <div>
      <UserMainHeader title={title} />
      <div className="CategoryListBox">
        {stores.map((store) => (
          <Link
            to={store.storeId}
            state={{ storeId: store.id }} // state는 to 바깥에서 전달
            key={store.id}
          >
            <div className="CategoryStore">
              <img src={images.cakeStore} alt="케이크" />
              <div className="storeContent">
                <div>{store.storeName}</div>
                <div>지역 : {store.regionName}</div>
                <div>카테고리 : {store.categoryName}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
