import React, { useEffect, useState } from "react";
import "../css/yewon.css";
import { Link } from "react-router-dom";

function StoreList(props) {
  const { memberNum } = props;

  const [storeList, setStoreList] = useState([]);

  // 매장 목록 가져오기
  useEffect(() => {
    fetch("http://localhost:8080/storelist")
      .then((response) => response.json())
      .then((data) => setStoreList(data))
      .catch((error) => console.error("Error: ", error));
  }, []);

  return (
    <div className="max-h-[60vh] overflow-y-scroll">
      <div className="mystores-header flex items-center justify-between">
        <span>
          <strong style={{fontSize: "25px"}}>내 매장 관리 </strong> {storeList.length}
        </span>

        <div
          className="my-store-register"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "0 20px",
          }}
        >
          <Link to="/mypage/register" state={{ memberNum }}>
            <button
              class="bg-black text-white py-1.5 px-4 border rounded shadow"
              style={{ fontSize: "14px" }}
            >
              내 매장 등록하기
            </button>
          </Link>
        </div>
      </div>
      <div className="mystores">
        {storeList.map((store, index) => {
          if (store.memberId == memberNum) {
            return (
              <li className="mystores-list flex flex-col" key={index}>
                <div className="mb-2" style={{fontSize: "20px"}}>{store.store}</div>
                <div className="flex justify-evenly w-8/12">
                  <Link to="/mypage/reservations">
                    <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded shadow">
                      예약 관리
                    </button>
                  </Link>
                  <Link to="/mypage/storemanage" state={{ store: store }}>
                    <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded shadow">
                      매장 관리
                    </button>
                  </Link>
                  <Link to="/mypage/editstores" state={{ store: store }}>
                    <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 border border-gray-400 rounded shadow">
                      매장 정보 수정
                    </button>
                  </Link>
                </div>{" "}
              </li>
            );
          }
        })}
      </div>
    </div>
  );
}

export default StoreList;
