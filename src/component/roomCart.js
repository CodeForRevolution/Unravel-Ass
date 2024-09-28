import React from "react";
import "./roomCart.css";
import { useRef, useEffect, useState } from "react";
import VideoPlayer from "./mediaComponent/mediaPlayer";
import Description from "./HelperComponent/description";


const RoomCart = ({
  name,
  bed_type,
  max_adult,
  totalPrice,
  discountedPrice,
  roomImage,
  roomVideo,
}) => {
  const videoRef = useRef(null); // Reference for the video element
  const [isTouchDevice, setIsTouchDevice] = useState(false); // State to track if it's a touch device
  const discount = Math.round(
    ((totalPrice - discountedPrice) / totalPrice) * 100
  );

  function getRandomNumber() {
    return Math.floor(Math.random() * 7);
  }

  let index = getRandomNumber();

  // Detect if the device is touch-sensitive
  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)"); // Checks for touch devices
    setIsTouchDevice(mediaQuery.matches);
  }, []);

  return (
    <div class="col-sm-6  col-md-4 col-lg-3   my-3 px-1">
      <div
        class="room-card"
      >
        <div class="room-image">
          {roomVideo ? (
            <VideoPlayer src={roomVideo} isTouchDevice={isTouchDevice} />
          ) : (
            <img
              src={
                roomImage?.[index] ||
                "https://d1tf573zhz3zzy.cloudfront.net/data/content…/HOTEL_ROOM/sourced/Dubai/126675265/257802447.jpg"
              }
              alt="Room Image"
            />
          )}
        </div>
        <div class="room-info">
          <ul>
            <li>
              <i class="bi bi-house-door"></i> {name.substring(0, 40)}
            </li>
            <li>
              <i class="bi bi-bed"></i> {bed_type} Bed
            </li>
            <li>
              <i class="bi bi-people"></i> Up to {max_adult} adults
            </li>
          </ul>
          <p class="price-info">
            <span class="old-price">$,{totalPrice}</span> $,
            {discountedPrice}
            <span class="discount ms-2">{discount}% off</span>
          </p>
          <p class="cancellation-policy">Cancellation policy</p>
          <p>
            <Description text={description[index]} maxLength={70} />
          </p>
          <button class="btn btn-success select-button">Select</button>
        </div>
      </div>
    </div>
  );
};

export default RoomCart;

const description = [
  "Discover our elegant hotel room with plush furnishings, a serene ambiance, and stunning views for a perfect getaway",
  "Enjoy a luxurious stay in our spacious room, complete with modern amenities, a comfy bed, and beautiful décor",
  "Escape to our cozy hotel room, featuring a relaxing atmosphere, high-end amenities, and breathtaking views to rejuvenate you",
  "Stay in style in our chic hotel room, designed with contemporary décor, soft lighting, and all the comforts you need",
  " Experience a modern retreat in our well-appointed room, featuring cutting-edge technology, comfortable furnishings, and a peaceful vibe",
  " Enjoy a cozy getaway in our thoughtfully designed room, perfect for relaxation, complete with a warm ambiance and top-notch amenities.",
  "Experience the comforts of home in our inviting hotel room, offering all the essentials for a delightful stay and memorable moments.",
];
