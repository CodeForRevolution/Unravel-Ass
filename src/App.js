
import "./App.css";
import RoomCart from "./component/roomCart";
import cartData from "./data/roomData.json.json"; 
import { useState, useEffect, useRef, useCallback } from "react";
import Skeleton from "./component/skeleton/skeleton";

function App() {
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const [page, setPage] = useState(1); // Page number for infinite scrolling
  const [loading, setLoading] = useState(false); // Loading state
  const loaderRef = useRef(null); // Reference to the loading div
  const [maxPage, setMaxPage] = useState(3);
  const [itemsPerPage, setItemPerPage] = useState(10);

  // Fetch more cart items based on the page number
  const loadItems = () => {
    const newItems = cartData.rooms_by_serial_no[0].rooms.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );
    console.log("before seTimeout",loading)
    setTimeout(() => {
      setCartItems((prev) => [...prev, ...newItems]);
      setLoading(false);
      console.log("in TimeOut",loading)
    }, 1000);
  };

  // Trigger fetching more items when page changes
  useEffect(() => {
    loadItems();
  }, [page]);

  const handleScroll2 = useCallback(() => {
    try {
      if (!loading && page <= maxPage - 1) {
        if (
          window.innerHeight + document.documentElement.scrollTop + 0.8 >=
          document.documentElement.scrollHeight
        ) {
          setLoading(true); // Set loading to true to fetch new items
          setPage((prevPage) => prevPage + 1); // Increment page
        }
      }
    } catch (error) {
      console.log("ERROR****");
      setLoading(false);
    }
  }, [page, maxPage, loading]);

  useEffect(() => {
    const maxpage = Math.ceil(
      cartData.rooms_by_serial_no[0].rooms.length / itemsPerPage
    );
    setMaxPage((prev) => maxpage);
    window.addEventListener("scroll", handleScroll2);
    return () => {
      window.removeEventListener("scroll", handleScroll2);
    };
  }, [maxPage, page, loading]);

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
              discountedPrice={
                data.variants[0].total_price.discounted_price_rounded
              }
              roomImage={data.properties?.room_images?.[0]?.image_urls || null}
              roomVideo={data.properties?.video_url?.med || null}
            />
          );
        })}
        {loading
          ?Array(itemsPerPage).fill().map(() => {
              return <Skeleton />;
            })
          : null}
      </div>
    </>
  );
}

export default App;
