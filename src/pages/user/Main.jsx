import React, { useEffect } from "react";
import { images } from "../../utils/images";
import "../../css/Main.css";
import { Link } from "react-router-dom";
import { useRegion } from "../../context/RegionContext";
import Region from "../../components/Main/Region";
import { useCategory } from "../../context/CategoryContext";
import CategoryComponent from "../../components/Main/CategoryComponent";
import MainHeader from "../../components/Main/MainHeader";
import FavoriteStore from "../../components/Main/FavoriteStore";

const Main = () => {
  const { handleZone, handleUserRegion } = useRegion();
  const { setDetail, handleMainCategory } = useCategory();

  useEffect(() => {
    setDetail(false);
    handleZone();
    handleMainCategory();
    handleUserRegion();

    console.log("로그인 후 메인으로 돌아오면 회원정보 스토리지에 저장");
    localStorage.setItem("memberName", "승희");
    localStorage.setItem("memberphone", "010-2937-2595");
    localStorage.setItem("memberId", "13");
    localStorage.setItem("regionId", "24");
  }, []);

  return (
    <div>
      <MainHeader />
      <Region />
      <div className="px-5">
        <img src={images.mainBanner} alt="banner" className="rounded-3xl" />
      </div>
      <CategoryComponent />
      <FavoriteStore />
    </div>
  );
};

export default Main;
