import React, { createContext, useContext, useState } from "react";
import API from "../utils/axios";

const RegionContext = createContext();

export const RegionProvider = ({ children }) => {
  const [zone, setZone] = useState([]);
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [neighborhood, setNeighborhood] = useState([]);

  const handleZone = (response) => {
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
        console.log(data);
        setDistrict([]);
        setNeighborhood([]);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };

  const handleDistrict = (city) => {
    console.log(city);
    API.get(`region/district?city=${city}`)
      .then((response) => {
        const data = response.data;
        setDistrict(data);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };

  const handletNeighbolhood = (district) => {
    API.get(`region/neighborhood?district=${district}`)
      .then((response) => {
        const data = response.data;
        setNeighborhood(data);
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
        district,
        setDistrict,
        neighborhood,
        setNeighborhood,
        handleZone,
        handleDistrict,
        handleCities,
        handletNeighbolhood,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => useContext(RegionContext);
