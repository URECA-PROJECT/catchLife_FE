import React, { createContext, useContext, useEffect, useState } from "react";
import API from "../utils/axios";

const RegionContext = createContext();

export const RegionProvider = ({ children }) => {
  const [zone, setZone] = useState([]);
  const [city, setCity] = useState([]);
  const [userRegion, setUserRegion] = useState([]);
  const [changeRegion, setChangeRegion] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState();

  useEffect(() => {
    handleUserRegion();
  }, [selectedCityId]);

  // 지역 변경
  const handleChangeRegion = (value) => {
    setSelectedCityId(value);
    localStorage.setItem("regionId", value);
  };

  const handleUserRegion = () => {
    const regionId = localStorage.getItem("regionId")
      ? localStorage.getItem("regionId")
      : 1;

    API.get(`region/${regionId}`)
      .then((response) => {
        const data = response.data;
        console.log(data, "userRegion");
        setUserRegion(data);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };

  const handleZone = () => {
    API.get("region/zone")
      .then((response) => {
        const data = response.data;
        setZone(data);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };

  const handleCities = (zone) => {
    API.get(`region/cities?zone=${zone}`)
      .then((response) => {
        const data = response.data;
        setCity(data);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };

  return (
    <RegionContext.Provider
      value={{
        zone,
        setZone,
        city,
        setCity,
        handleZone,
        handleCities,
        handleUserRegion,
        userRegion,
        setUserRegion,
        handleChangeRegion,
        changeRegion,
        setChangeRegion,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => useContext(RegionContext);
