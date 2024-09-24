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
import { RegionProvider } from "./context/RegionContext";
import SignupUser from "./components/SignupUser";
import LoginUser from "./components/LoginUser";
import LoginAdmin from "./components/LoginAdmin";
import Login from "./pages/user/Login";
import SignupAdmin1 from "./components/SignupAdmin1";
import SignupAdmin2 from "./components/SignupAdmin2";

function App() {
  return (
    <RegionProvider>
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

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userMyPage" element={<UserMyPage />} />
          <Route path="/signupAdmin1" element={<SignupAdmin1 />} />
          <Route path="/signupAdmin2" element={<SignupAdmin2 />} />
          <Route path="/signupUser" element={<SignupUser />} />
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/loginUser" element={<LoginUser />} />
        </Routes>
      </div>
    </RegionProvider>
  );
}

export default App;
