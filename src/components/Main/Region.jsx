import React, { useEffect } from "react";
import { useRegion } from "../../context/RegionContext";
import "../../css/Main.css";
import { SlLocationPin } from "react-icons/sl";
import { useLogin } from "../../context/LoginContext";

const Region = () => {
  const {
    zone,
    city,
    handleCities,
    userRegion,
    handleChangeRegion,
    setChangeRegion,
    changeRegion,
  } = useRegion();

  return (
    <>
      {changeRegion && (
        <div className="flex items-center justify-between px-10 py-3">
          <div className="flex items-center">
            <SlLocationPin size={20} className="mr-2" />
            {/* zone */}
            <select
              className="regionItem "
              name="location"
              id="zone"
              onChange={(e) => handleCities(e.target.value)}
            >
              {zone.map((item, index) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            {/* city */}
            {city.length > 0 && (
              <select
                className="regionItem"
                name="location"
                id="city"
                onChange={(e) => handleChangeRegion(e.target.value)}
              >
                <option value="default" disabled>
                  시/군
                </option>
                {city.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.city}
                  </option>
                ))}
              </select>
            )}
          </div>

          <button
            onClick={() => setChangeRegion(false)}
            className="text-xs ml-2"
          >
            완료
          </button>
        </div>
      )}

      {/* 내 지역 */}
      {!changeRegion && (
        <div className="flex items-center justify-between px-10 py-3">
          <div className="flex items-center">
            <SlLocationPin size={20} className="mr-1" />
            <div className="p-1 font-bold">{userRegion.zone}</div>
            <div className="p-1 font-bold">{userRegion.city}</div>
          </div>

          <button
            onClick={() => {
              handleCities("서울");
              setChangeRegion(true);
            }}
            className="text-xs"
          >
            다른 지역 찾기
          </button>
        </div>
      )}
    </>
  );
};

export default Region;
