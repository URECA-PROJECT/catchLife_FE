import React from "react";
import { useCategory } from "../../context/CategoryContext";
import { FaArrowLeftLong } from "react-icons/fa6";

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
      <div className="px-8 pt-5">오늘의 베스트 카테고리</div>
      {/* 메인 카테고리 */}
      {!detail && (
        <div className="flex items-center justify-center">
          {mainCategory.map((category) => (
            <div className="flex flex-col items-center p-3">
              <button
                className="category"
                key={category.id}
                onClick={() => handleCategoryDetail(category.id)}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 세부 카테고리 */}
      {detail && (
        <>
          <div className="flex items-center justify-center">
            <div className="flex items-center p-3 break-keep">
              <button onClick={() => setDetail(false)}>
                <FaArrowLeftLong />
              </button>
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
          </div>
        </>
      )}
    </>
  );
};

export default CategoryComponent;
