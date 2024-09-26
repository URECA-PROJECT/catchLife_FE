import React from "react";
import { useCategory } from "../../context/CategoryContext";

const CategoryComponent = () => {
  const {
    detail,
    mainCategory,
    handleCategoryDetail,
    setDetail,
    detailCategory,
    handleStoreList,
  } = useCategory();

  return (
    <>
      {/* 메인 카테고리 */}
      {!detail && (
        <div className="categoryBox">
          {mainCategory.map((category) => (
            <>
              <button
                className="category"
                key={category.id}
                onClick={() => handleCategoryDetail(category.id)}
              >
                <div>{category.name}</div>
              </button>
            </>
          ))}
        </div>
      )}

      {/* 세부 카테고리 */}
      {detail && (
        <>
          <button onClick={() => setDetail(false)}>뒤로 가기</button>
          <div className="categoryBox">
            {detailCategory.map((category) => (
              <>
                <button
                  className="category"
                  key={category.id}
                  onClick={() => handleStoreList(category.id)}
                >
                  <div>{category.name}</div>
                </button>
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default CategoryComponent;
