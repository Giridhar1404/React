import React from "react";
import { Link } from "react-router-dom";

const Restaurant = () => {
  return (
    <>
      <Link to="/menu">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D"
          alt="Dish"
          style={{ cursor: "pointer", width: "50%", maxWidth: "300px" ,padding:"50px"}}
        />
        
      </Link>
      <Link to="/menu2">
       <img
          src="https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg"
          alt="Dish"
          style={{ cursor: "pointer", width: "50%", maxWidth: "300px" ,padding:"50px"}}
        />
      </Link>

    </>
  );
};

export default Restaurant;