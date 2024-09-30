import React from "react";
import "./App.css";
import Main from "./pages/user/Main";
import { Route, Routes } from "react-router-dom";
import Category from "./pages/user/Category";
import Store from "./pages/user/Store";
import StoreDetail from "./pages/user/StoreDetail";
import Order from "./pages/user/Order";
import OrderCustom from "./pages/user/OrderCustom";
import { RegionProvider } from "./context/RegionContext";
import MyPage from "./pages/user/MyPage";
import EditProfile from "./pages/user/EditProfile";
import ReservationManagement from "./pages/user/ReservationManagement";
import StoreManagement from "./pages/user/StoreManagement";
import EditStores from "./pages/user/EditStores";
import { CategoryProvider } from "./context/CategoryContext";
import ReservationDetail from "./pages/user/ReservationDetail";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import StoreRegister from "./pages/user/StoreRegister";
import { LoginProvider } from "./context/LoginContext";
import FavoriteStore from "./pages/user/FavoriteStore";
import BlockReservations from "./pages/user/BlockReservations";

function App() {
  return (
    <LoginProvider>
      <RegionProvider>
        <CategoryProvider>
          <div className="App font">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/category" element={<Category />} />
              <Route path="/category/:storeId" element={<Store />} />
              <Route
                path="/category/:storeId/menus"
                element={<StoreDetail />}
              />
              <Route path="/order/:storeId/:productId" element={<Order />} />

              <Route
                path="/category/:id/:store/:sort/custom"
                element={<OrderCustom />}
              />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route path="/mypage" element={<MyPage />} />
              <Route path="/mypage/editprofile" element={<EditProfile />} />
              <Route
                path="/mypage/reservations"
                element={<ReservationManagement />}
              />
              <Route
                path="/mypage/reservations/block"
                element={<BlockReservations />}
              />
              <Route
                path="/mypage/reservations/detail"
                element={<ReservationDetail />}
              />

              <Route path="/mypage/register" element={<StoreRegister />} />
              <Route path="/mypage/storemanage" element={<StoreManagement />} />
              <Route path="/mypage/editstores" element={<EditStores />} />

              <Route path="/favoriteStore" element={<FavoriteStore />} />
            </Routes>
          </div>
        </CategoryProvider>
      </RegionProvider>
    </LoginProvider>
  );
}

export default App;
