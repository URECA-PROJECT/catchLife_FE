import React from "react";
import { useLocation } from "react-router-dom";
import UserMainHeader from "../../components/UserMainHeader";

const Store = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const store = pathSegments[pathSegments.length - 1];

  return (
    <div>
      <UserMainHeader title={store} />
    </div>
  );
};

export default Store;
