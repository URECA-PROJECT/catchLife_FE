import React, { createContext, useContext, useState } from "react";
import API from "../utils/axios";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [detail, setDetail] = useState(false);
  const [mainCategory, setMainCategory] = useState([]);
  const [detailCategory, setDetailCategory] = useState([]);

  // 메인 카테고리
  const handleMainCategory = () => {
    API.get("/category")
      .then((response) => {
        const mainCategoryData = response.data;

        setMainCategory(mainCategoryData);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };

  // 메인 카테고리 > 세부 카테고리
  const handleCategoryDetail = (categoryId) => {
    setDetail(true);
    API.get(`/categoryDetail/${categoryId}`)
      .then((response) => {
        const categoryDetailData = response.data;

        setDetailCategory(categoryDetailData);
        console.log(categoryDetailData);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };

  const handleStoreList = (categoryDetailId) => {
    console.log(categoryDetailId);
    console.log(
      "서울 지역에서 뷰티 > 네일 클릭하면 서울지역의 모든 네일샵 리스트 보여주기 하면 됨 ~"
    );
  };

  return (
    <CategoryContext.Provider
      value={{
        detail,
        setDetail,
        mainCategory,
        setMainCategory,
        detailCategory,
        setDetailCategory,
        handleMainCategory,
        handleCategoryDetail,
        handleStoreList,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
