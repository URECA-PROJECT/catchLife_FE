import React from "react";
import { useRegion } from "../context/RegionContext";
import "../css/Main.css";
import { CiLocationOn } from "react-icons/ci";

const Region = () => {
  const {
    zone,
    city,
    district,
    neighborhood,
    handleDistrict,
    handleCities,
    handletNeighbolhood,
  } = useRegion();
  return (
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
          onChange={(e) => handleDistrict(zone, e.target.value)}
        >
          <option value="default" disabled>
            시/군
          </option>
          {city.map((item, index) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      )}

      {/* district */}
      {district.length > 0 && (
        <select
          className="regionItem"
          name="location"
          id="select"
          onChange={(e) => handletNeighbolhood(e.target.value)}
        >
          <option value="default" disabled>
            구
          </option>
          {district.map((item, index) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      )}

      {/* neighborhood */}
      {neighborhood.length > 0 && (
        <select
          className="regionItem"
          name="location"
          id="neighborhood"
          onChange={(e) => console.log(e.target.value)}
        >
          <option value="default" disabled>
            읍/면/동
          </option>
          {neighborhood.map((item, index) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Region;
