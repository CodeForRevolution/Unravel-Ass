import React from "react";
import "./roomCart.css";
import { useRef,useEffect ,useState} from "react";
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
    return Math.floor(Math.random() * 8); // Generates a number between 0 and 7
  }

  let index = getRandomNumber();

  // Detect if the device is touch-sensitive
  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)"); // Checks for touch devices
    setIsTouchDevice(mediaQuery.matches);
    console.log("*****media cursor***",isTouchDevice)
  }, []);

  // Play/Pause video based on viewport visibility (only for touch devices)
  useEffect(() => {
    if (isTouchDevice) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = videoRef.current;
            if (entry.isIntersecting) {
              video.volume = 0.5;
              video.play(); // Play the video when in the viewport
            } else if (video) {
              video.pause(); // Pause the video when out of the viewport
            }
          });
        },
        { threshold: 0.5 } // Trigger when at least 50% of the video is visible
      );

      if (videoRef.current) {
        observer.observe(videoRef.current); // Observe the video element
      }

      return () => {
        if (videoRef.current) {
          observer.unobserve(videoRef.current); // Cleanup observer
        }
      };
    }
  }, [isTouchDevice]);

  // Handlers for playing/pausing video on hover for non-touch devices
  const handleMouseEnter = () => {
 try {

  console.log("***HOVERING THE MOUSE*****",isTouchDevice)
  if (!isTouchDevice && videoRef.current) {
    videoRef.current.volume = 0.5;
    videoRef.current.play();
  }
  
 } catch (error) {
  console.log("ERROR<>",error)
 }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice && videoRef.current) {
      videoRef.current.pause();
    }
  };





  return (
    <div class="col-sm-6  col-md-4 col-lg-3   my-3 px-1">
      <div class="room-card"
       onMouseEnter={handleMouseEnter} // Play video when hovered (for non-touch devices)
       onMouseLeave={handleMouseLeave}
      >
        <div class="room-image">
        {roomVideo ? (
            <video
              ref={videoRef}
              controls
              width="100%"
              playsInline  // Ensures playback without full-screen on mobile
             
              // Pause video when hover stops (for non-touch devices)
            >
              <source src={roomVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={roomImage?.[index] || ""} alt="Room Image" />
          )}
        </div>
        <div class="room-info">
          <ul>
            <li>
              <i class="bi bi-house-door"></i> {name.substring(0,40)}
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
            {discountedPrice }
            <span class="discount ms-2">{discount}% off</span>
          </p>
          <p class="cancellation-policy">Cancellation policy</p>
          <p>{"check the room"}</p>
          <button class="btn btn-success select-button">Select</button>
        </div>
      </div>
    </div>
  );
};

export default RoomCart;
