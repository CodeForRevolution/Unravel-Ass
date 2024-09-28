import logo from "./logo.svg";
import "./App.css";
import RoomCart from "./component/roomCart";
import cartData from "./data/roomData.json.json"; // Import your JSON file locally
import { useState, useEffect, useRef } from "react";
import Skeleton from "./component/skeleton/skeleton";

function App() {
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const [page, setPage] = useState(1); // Page number for infinite scrolling
  const [loading, setLoading] = useState(false); // Loading state
  const loaderRef = useRef(null); // Reference to the loading div

  const itemsPerPage = 10; // Number of items to load per scroll

  console.log("Data", cartData.avail_id);

  // Fetch more cart items based on the page number
  const loadItems = () => {
    console.log("all length", cartData.rooms_by_serial_no[0].rooms.length);
    console.log("all length", cartData.rooms_by_serial_no[0].rooms);
    const newItems = cartData.rooms_by_serial_no[0].rooms.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );
    setTimeout(() => {
      setCartItems((prev) => [...prev, ...newItems]);
      setLoading(false);
    }, 1000);
  };

  // Trigger fetching more items when page changes
  useEffect(() => {
    console.log("Setting the page again", page);
    setLoading(true);
    loadItems();

    console.log("Data", cartItems);
  }, [page]);

  const handleScroll = () => {
    try {
      if (!loading) {
        if (
          window.innerHeight + document.documentElement.scrollTop + 0.8 >=
          document.documentElement.scrollHeight
        ) {
          setLoading(true); // Immediately set loading to true to prevent multiple page increments
          setPage((prevPage) => prevPage + 1); // Increment page
        }
      }
    } catch (error) {
      console.log("ERROR****");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="row px-md-2  p-0 m-0">
        {cartItems.map((data, index) => {
          return (
            <RoomCart
              key={index}
              roomType={data.roomType}
              name={data.name}
              bed_type={data.properties.bed_type}
              max_adult={data.properties.room_capacity.max_adult}
              totalPrice={data.variants[0].total_price.total_price_rounded}
              discountedPrice={data.variants[0].total_price.discounted_price_rounded}
              roomImage={ data.properties?.room_images?.[0]?.image_urls
                || null}
              roomVideo={ data.properties?.video_url?.med || null}
            />
          );
        })}
        {loading
          ? [1, 2, 3, 4, 5, 4, 5, 6, 3, 2].map(() => {
              return <Skeleton />;
            })
          : null}
      </div>
    </>
  );
}

export default App;
