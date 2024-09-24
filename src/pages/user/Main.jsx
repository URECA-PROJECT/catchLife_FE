import React, { useEffect, useState } from "react";
import { images } from "../../utils/images";
import "../../css/Main.css";
import { Link } from "react-router-dom";
import mainCategory from "../../utils/mockData/mainCategory.json";
import detailCategory from "../../utils/mockData/mainDetailCategory.json";
import { useRegion } from "../../context/RegionContext";
import Region from "../../components/Region";

const Main = () => {
  const { handleZone } = useRegion();

  const [detail, setDetail] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const filteredStores = detailCategory
    .filter((category) => category.name === categoryName)
    .map((category) => category.category);

  const handleCategory = (value) => {
    setDetail(true);
    setCategoryName(value);
  };

  useEffect(() => {
    setDetail(false);
    handleZone();
  }, []);

  return (
    <div>
      <Link to="/">
        <div className="logo">
          <svg
            width="50"
            height="93"
            viewBox="0 0 60 93"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="30" cy="41.5" rx="30" ry="30.5" fill="black" />
            <path
              d="M33.0938 25.76C34.5071 25.76 36.1338 25.96 37.9738 26.36C39.8404 26.76 41.2004 27.1867 42.0538 27.64V35.4H40.5338C38.0804 31.2133 34.8271 29.12 30.7738 29.12C29.0138 29.12 27.4004 29.64 25.9338 30.68C24.4938 31.6933 23.3604 33.12 22.5338 34.96C21.7071 36.7733 21.2938 38.8133 21.2938 41.08C21.2938 43.6933 21.6938 46.08 22.4938 48.24C23.3204 50.4 24.5604 52.1333 26.2138 53.44C27.8938 54.7467 29.9604 55.4 32.4138 55.4C34.6804 55.4 37.9338 53.6933 42.1738 50.28L43.3738 52.2L36.0138 57.92C35.0271 58.2667 34.0671 58.4933 33.1338 58.6C32.2271 58.7333 31.2404 58.8 30.1738 58.8C27.3738 58.8 24.8938 58.12 22.7338 56.76C20.5738 55.4 18.8938 53.5333 17.6938 51.16C16.4938 48.76 15.8938 46.04 15.8938 43C15.8938 39.88 16.8004 37 18.6138 34.36C20.4271 31.6933 22.6804 29.6 25.3738 28.08C28.0671 26.5333 30.6404 25.76 33.0938 25.76Z"
              fill="white"
            />
          </svg>
        </div>
        <div>
          <Link to="/signup">회원가입 페이지(상희)</Link>
        </div>
        <div>
          <Link to="/login">로그인 페이지(상희)</Link>
        </div>
        <div>
          <Link to="/userMyPage">마이페이지(예원)</Link>
        </div>
      </Link>

      <Region />

      <div className="banner">임시배너공간</div>
      {!detail && (
        <div className="categoryBox">
          {mainCategory.map((category) => (
            <>
              <button
                className="category"
                key={category.id}
                onClick={() => handleCategory(category.name)}
              >
                <div>{category.title}</div>
              </button>
            </>
          ))}
        </div>
      )}
      {detail && (
        <>
          <button onClick={() => setDetail(false)}>뒤로 가기</button>
          <div className="categoryBox">
            {filteredStores[0].map((category) => (
              <Link to={`/category/${category.name}`} key={category.id}>
                <div className="category">{category.title}</div>
              </Link>
            ))}
          </div>
        </>
      )}
      <div>
        <div className="subTitle">어디로 가시나요?</div>
        <div className="cityBox">
          <Link to="">
            <div className="city">내 주변</div>
          </Link>
          <Link to="">
            <div className="city">서울</div>
          </Link>
          <Link to="">
            <div className="city">경기</div>
          </Link>
          <Link to="">
            <div className="city">인천</div>
          </Link>
        </div>
      </div>
      <div>
        <div className="subTitle">내가 즐겨찾는 매장</div>
        <div className="bookMarkBox">
          <Link to="">
            <div className="bookMark">
              <img src={images.banner} alt="" />
              <span>유레카 미용실</span>
            </div>
          </Link>
          <Link to="">
            <div className="bookMark">
              <img src={images.banner} alt="" />
              <span>유레카 미용실</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
