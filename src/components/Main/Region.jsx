import React from "react";
import { useRegion } from "../../context/RegionContext";
import "../../css/Main.css";
import { CiLocationOn } from "react-icons/ci";

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
        <div className="locationBox">
          <CiLocationOn />
          {/* zone */}
          <select
            className="regionItem"
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

          <button onClick={() => setChangeRegion(false)}>확인</button>
        </div>
      )}

      {/* 내 지역 */}
      {!changeRegion && (
        <div className="locationBox flex items-center">
          <CiLocationOn />
          <div className="p-1">{userRegion.zone}</div>
          <div className="p-1">{userRegion.city}</div>

          <button
            onClick={() => {
              handleCities("서울");
              setChangeRegion(true);
            }}
            className="text-xs mt-1 ml-1"
          >
            지역 변경하기
          </button>
        </div>
      )}
    </>
  );
};

export default Region;
