import React from "react";
import { useParams } from "react-router-dom";
import Fetch from "./fetch";

const Menu = () => {
  const { id } = useParams();
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Restaurant Menu</h1>
      <Fetch restaurantId={id} />
    </div>
  );
};

export default Menu;