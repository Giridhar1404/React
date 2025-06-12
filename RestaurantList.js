import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const proxy = "https://thingproxy.freeboard.io/fetch/";
        const url =
          "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.7332622&lng=83.3061117&page_type=DESKTOP_WEB_LISTING";
        const res = await fetch(proxy + url);
        const data = await res.json();

        const cards = data?.data?.cards || [];

        const allRestaurants = cards
          .flatMap((card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants || [])
          .filter(Boolean);

        // ✅ Deduplicate using Map
        const uniqueMap = new Map();
        for (const r of allRestaurants) {
          const id = r?.info?.id;
          if (id && !uniqueMap.has(id)) {
            uniqueMap.set(id, r);
          }
        }

        setRestaurants(Array.from(uniqueMap.values()));
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setError("Failed to fetch restaurant list.");
      }
    };

    fetchRestaurants();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (restaurants.length === 0) return <p>Loading restaurants...</p>;

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px", flexWrap: "wrap" }}>
      {restaurants.map((res, index) => (
        <Link
          to={`/menu/${res.info.id}`}
          key={`${res.info.id}-${index}`} // ✅ ensures unique key
          style={{ textDecoration: "none", color: "black" }}
        >
          <div
            style={{
              width: "250px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <img
              src={`https://media-assets.swiggy.com/swiggy/image/upload/${res.info.cloudinaryImageId}`}
              alt={res.info.name}
              style={{ width: "100%", height: "160px", objectFit: "cover" }}
            />
            <h3 style={{ padding: "10px" }}>{res.info.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RestaurantList;