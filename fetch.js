import React, { useEffect, useState } from "react";

const Fetch = () => {
  const [menuData, setMenuData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const proxyUrl = "https://thingproxy.freeboard.io/fetch/";
    const targetUrl =
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.7332622&lng=83.3061117&restaurantId=1022642&catalog_qa=undefined&submitAction=ENTER";

    fetch(proxyUrl + targetUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setMenuData(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!menuData) return <p>Loading menu...</p>;

  const allItems = menuData?.data?.cards
    ?.flatMap((card) => {
      const group = card?.groupedCard?.cardGroupMap?.REGULAR?.cards;
      if (!group) return [];
      return group.flatMap(
        (innerCard) => innerCard?.card?.card?.itemCards || []
      );
    })
    .filter(Boolean);

  const uniqueItems = allItems.filter(
    (item, index, self) =>
      index === self.findIndex(
        (t) => t.card.info.id === item.card.info.id
      )
  );

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
            key={`${id}-${index}`}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              width: "220px",
              padding: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
              backgroundColor: "#fff"
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