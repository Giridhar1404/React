import React, { useEffect, useState } from "react";

const Fetch = ({ restaurantId }) => {
  const [menuData, setMenuData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!restaurantId) return;

    const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
    const targetUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.7332622&lng=83.3061117&restaurantId=${restaurantId}`;

    fetch(proxyUrl + targetUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setMenuData(data))
      .catch((err) => setError(err.message));
  }, [restaurantId]);

  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!menuData) return <p>Loading menu...</p>;

  // SAFELY extract menu items
  let allItems = [];

  try {
    const cards = menuData?.data?.cards || [];
    for (const card of cards) {
      const regularCards = card?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
      for (const innerCard of regularCards) {
        const items = innerCard?.card?.card?.itemCards;
        if (Array.isArray(items)) {
          allItems.push(...items);
        }
      }

      // Fallback if items are outside REGULAR
      const fallbackItems = card?.card?.card?.itemCards;
      if (Array.isArray(fallbackItems)) {
        allItems.push(...fallbackItems);
      }
    }
  } catch (err) {
    console.warn("Error parsing menu:", err);
    allItems = [];
  }

  // ✅ Deduplicate using Map
  const itemMap = new Map();
  for (const item of allItems) {
    const id = item?.card?.info?.id;
    if (id && !itemMap.has(id)) {
      itemMap.set(id, item);
    }
  }

  const uniqueItems = Array.from(itemMap.values());

  if (uniqueItems.length === 0) return <p>No menu items found.</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", padding: "20px" }}>
      {uniqueItems.map((item, index) => {
        const { id, name, price, defaultPrice, imageId } = item.card.info;
        const displayPrice = (price || defaultPrice || 0) / 100;
        const imageUrl = imageId
          ? `https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`
          : "https://via.placeholder.com/150";

        return (
          <div
            key={`${id}-${index}`} // ✅ avoids duplicate key errors
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              width: "220px",
              padding: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={imageUrl}
              alt={name}
              style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "6px" }}
            />
            <h3 style={{ margin: "10px 0 5px", fontSize: "1.1em" }}>{name}</h3>
            <p style={{ fontWeight: "bold" }}>₹{displayPrice || "N/A"}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Fetch;