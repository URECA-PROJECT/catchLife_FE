import React, { useEffect } from "react";
import { useRegion } from "../context/RegionContext";
import { useLogin } from "../context/LoginContext";

const RegionSignup = () => {
  const { zone, city, handleCities, handleZone } = useRegion();
  const { handleChange } = useLogin();

  useEffect(() => {
    handleZone();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between px-10 py-3 signup-input">
        <div className="flex items-center">
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
              name="region"
              id="city"
              onChange={(e) => {
                handleChange(e);
              }}
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
      </div>
    </>
  );
};

export default RegionSignup;
