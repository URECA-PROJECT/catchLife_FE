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

  // const filteredStores = categoryData
  //   .filter((category) => category.name === categoryTitle)
  //   .map((category) => category.stores);

  // console.log(filteredStores);

  return (
    <div>
      <UserMainHeader title={categoryTitle} />
      <div className="CategoryListBox">
        {categoryData[0].stores.map((store) => (
          <Link to="pococake">
            <div className="CategoryStore" key="pococake">
              <img src={images.cakeStore} alt="케이크" />
              <div className="storeContent">
                <div>{store.name}</div>
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
