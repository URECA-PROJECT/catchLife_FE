import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../utils/images";

const FavoriteStore = () => {
  return (
    <>
      <div className="subTitle">내가 즐겨찾는 매장</div>
      <div className="grid grid-cols-3 w-[90%] mx-auto">
        <Link to="" className="m-5 flex">
          <div className="text-center">
            <img src={images.nailStore} alt="" className="rounded-xl" />
            <div className="text-sm mt-2">유레카 네일</div>
          </div>
        </Link>

        <Link to="" className="m-5 flex">
          <div className="text-center">
            <img src={images.nailStore} alt="" className="rounded-xl" />
            <div className="text-sm mt-2">유레카 네일</div>
          </div>
        </Link>

        <Link to="" className="m-5 flex">
          <div className="text-center">
            <img src={images.nailStore} alt="" className="rounded-xl" />
            <div className="text-sm mt-2">유레카 네일</div>
          </div>
        </Link>

        <Link to="" className="m-5 flex">
          <div className="text-center">
            <img src={images.nailStore} alt="" className="rounded-xl" />
            <div className="text-sm mt-2">유레카 네일</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default FavoriteStore;
