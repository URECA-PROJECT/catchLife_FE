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
      <div className="px-8 pt-5" style={{fontSize: "20px"}}>🔥 오늘의 베스트 카테고리</div>
      {/* 메인 카테고리 */}
      {!detail && (
        <div className="flex items-center justify-center" style={{border: "1px solid #eee", margin: "10px 30px", padding: "10px", borderRadius: "20px"}}>
          {mainCategory.map((category) => (
            <div className="flex flex-col items-center p-1">
              <button
                class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                key={category.id}
                onClick={() => handleCategoryDetail(category.id)}
              >
                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {category.name}
                </span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 세부 카테고리 */}
      {detail && (
        <>
          <div className="flex items-center justify-center"  style={{border: "1px solid #eee", borderRadius: "20px", margin: "10px 30px", padding: "10px"}}>
            <div className="flex items-center p-3 break-keep">
              <button onClick={() => setDetail(false)} style={{width: "30px"}}>
                <FaArrowLeftLong />
              </button>
              {detailCategory.map((category) => (
                <>
                  <button
                    class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                    key={category.id}
                    onClick={() => handleStoreList(category.id)}
                    >
                  <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    <div>{category.name}</div>
                    </span>
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
