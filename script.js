import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Restaurant from "./components/Restaurant";
import Menu from "./components/Menu"; // We'll create this next
import Menu2 from "./components/menu2";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Restaurant />} />
        <Route path="/menu" element={<Menu />} />
         <Route path="/menu2" element={<Menu2 />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = document.getElementById("root");
const rootele = createRoot(root);
rootele.render(<App />);