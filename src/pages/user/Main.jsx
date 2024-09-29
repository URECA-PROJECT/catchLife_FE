import React, { useEffect } from "react";
import { images } from "../../utils/images";
import "../../css/Main.css";
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

    const region = localStorage.getItem("regionId")
      ? localStorage.getItem("regionId")
      : 1;
    localStorage.setItem("regionId", region);
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
