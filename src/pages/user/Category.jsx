import React from "react";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          뒤로가기
        </button>
        <div>카테고리명</div>
      </div>

      <div className="CategoryListBox">
        <div className="CategoryStore">
          <img src="" alt="" />
          <div>
            <div>가게명</div>
            <div>가게 설명</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
