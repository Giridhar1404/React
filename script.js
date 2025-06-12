import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RestaurantList from "./components/RestaurantList";
import Menu from "./components/Menu";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<RestaurantList />} />
      <Route path="/menu/:id" element={<Menu />} />
    </Routes>
  </BrowserRouter>
);

const root = document.getElementById("root");
createRoot(root).render(<App />);