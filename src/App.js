import React from "react";
import "./App.css";
import Main from "./pages/user/Main";
import { Route, Routes } from "react-router-dom";
import Category from "./pages/user/Category";
import Store from "./pages/user/Store";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path={`/category/:id`} element={<Category />}></Route>
        <Route path={`/category/:id/:store`} element={<Store />}></Route>
      </Routes>
    </div>
  );
}

export default App;
