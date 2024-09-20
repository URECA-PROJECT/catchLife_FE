import React from "react";
import "./App.css";
import Main from "./pages/user/Main";
import { Route, Routes } from "react-router-dom";
import Category from "./pages/user/Category";
import Store from "./pages/user/Store";
import StoreDetail from "./pages/user/StoreDetail";
import Order from "./pages/user/Order";
import OrderCustom from "./pages/user/OrderCustom";
import Signup from "./pages/user/Signup";
import UserMyPage from "./pages/user/UserMyPage";
// import YongdomCrud01 from "./pages/YongdomCrud01";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/category/:id/:store" element={<Store />} />
        <Route path="/category/:id/:store/:sort" element={<StoreDetail />} />
        <Route path="/category/:id/:store/:sort/order" element={<Order />} />
        <Route
          path="/category/:id/:store/:sort/custom"
          element={<OrderCustom />}
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/userMyPage" element={<UserMyPage />} />
        {/* <Route path="/test" element={<YongdomCrud01 />} /> */}
      </Routes>
    </div>
  );
}

export default App;
