import React from "react";
import { Link, useLocation } from "react-router-dom";
import { images } from "../../utils/images";
import "../../css/Main.css";
import UserMainHeader from "../../components/UserMainHeader";
import categoryData from "../../utils/mockData/Category.json";

const Category = () => {
  const location = useLocation();

  const pathSegments = location.pathname.split("/");
  const categoryTitle = pathSegments[pathSegments.length - 1];

  const filteredStores = categoryData
    .filter((category) => category.name === categoryTitle)
    .map((category) => category.stores);

  return (
    <div>
      <UserMainHeader title={categoryTitle} />
      <div className="CategoryListBox">
        {filteredStores[0].map((store) => (
          <Link
            to={store.name}
            state={{ storeId: store.id }} // state는 to 바깥에서 전달
            key={store.id}
          >
            <div className="CategoryStore">
              <img src={images.cakeStore} alt="케이크" />
              <div className="storeContent">
                <div>{store.storeName}</div>
                <div>{store.address}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
