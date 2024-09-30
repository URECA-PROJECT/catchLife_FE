import React, { createContext, useContext, useState } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState(false);
  const [mainCategory, setMainCategory] = useState([]);
  const [detailCategory, setDetailCategory] = useState([]);
  const [stores, setStores] = useState([]);

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
    API.get(`/categoryDetail/${categoryId}`)
      .then((response) => {
        const categoryDetailData = response.data;
        setDetailCategory(categoryDetailData);
        setDetail(true);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };

  // 세부 카테고리 > 해당 카테고리 매장 리스트
  const handleStoreList = (categoryDetailId) => {
    const regionId = localStorage.getItem("regionId"); // 지역 id 얻어오기

    API.get("/storelist/filtered", {
      params: {
        regionId: regionId, // 지역 id
        categoryDetailId: categoryDetailId, // 세부 카테고리 id
      },
    })
      .then((response) => {
        const data = response.data;
        setStores(data);
      })
      .then((response) => {
        // 모든 리스트 반환 후 페이지 이동
        navigate("/category");
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };

  return (
    <CategoryContext.Provider
      value={{
        stores,
        setStores,
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
