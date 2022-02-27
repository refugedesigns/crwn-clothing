import React from "react";
import "./App.css";
import Homepage from "./pages/homepage/Homepage";
import ShopePage from "./pages/shop/ShopePage";
import Header from "./components/header/Header";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
       <Route path="/" element={<Homepage />} />
       <Route path="/shop" element={<ShopePage />} />
      </Routes>
    </div>
  );
}

export default App;
