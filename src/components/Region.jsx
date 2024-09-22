import React from "react";
import { useRegion } from "../context/RegionContext";

const Region = () => {
  const {
    zone,
    setZone,
    city,
    setCity,
    district,
    setDistrict,
    neighborhood,
    setNeighborhood,
    handleZone,
    handleDistrict,
    handleCities,
    handletNeighbolhood,
  } = useRegion();
  return (
    <>
      {/* zone */}
      <select
        name="location"
        id="zone"
        onChange={(e) => handleCities(e.target.value)}
      >
        {zone.map((item, index) => (
          <option key={item}>{item}</option>
        ))}
      </select>

      {/* city */}
      {city.length !== 1 && (
        <select
          name="location"
          id="city"
          onChange={(e) => handleDistrict(e.target.value)}
        >
          <option value="" disabled selected>
            시/군
          </option>
          {city.map((item, index) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      )}

      {/* district */}
      {district.length > 1 && (
        <select
          name="location"
          id="select"
          onChange={(e) => handletNeighbolhood(e.target.value)}
        >
          <option value="" disabled selected>
            구
          </option>
          {district.map((item, index) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      )}

      {/* neighborhood */}
      {neighborhood.length > 1 && (
        <select
          name="location"
          id="neighborhood"
          onChange={(e) => console.log(e.target.value)}
        >
          <option value="" disabled selected>
            읍/면/동
          </option>
          {neighborhood.map((item, index) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      )}
    </>
  );
};

export default Region;
