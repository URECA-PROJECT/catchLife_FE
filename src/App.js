import React from "react";
import "./App.css";
import Main from "./pages/user/Main";
import { Route, Routes } from "react-router-dom";
import Category from "./pages/user/Category";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/category" element={<Category />}></Route>
      </Routes>
    </div>
  );
}

export default App;
