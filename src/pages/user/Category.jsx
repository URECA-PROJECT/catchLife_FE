import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../utils/images";
import "../../css/Main.css";
import UserMainHeader from "../../components/UserMainHeader";
import { useCategory } from "../../context/CategoryContext";

const Category = () => {
  const { stores } = useCategory();
  const title = stores[0]?.categoryDetailName || "";
  const RegionName = stores[0]?.regionName || "";
  return (
    <div>
      <UserMainHeader center={title} right={RegionName} />
      <div className="max-h-screen grid grid-cols-2 gap-5 w-[90%] mx-auto" style={{marginTop: "20px"}}>
        {stores.map((s) => (
          <Link
            to={`/category/${s.storeId}`}
            state={{ storeListId: s.storeId, storeName: s.storeName }} // state는 to 바깥에서 전달
            key={s.storeId}
            className="mx-auto"
          >
            <div className="CategoryStore">
              <img src={images.cakeStore} alt="케이크" />
              <div className="storeContent">
                <div>{s.storeName}</div>
              </div>
            </div>
          </Link>
        ))}

        <div className="mb-40"></div>
      </div>
    </div>
  );
};

export default Category;
