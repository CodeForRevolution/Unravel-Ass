// VideoPlayer.js
import React, { useRef, useEffect } from "react";

const VideoPlayer = ({ src, isTouchDevice }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (isTouchDevice) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = videoRef.current;
            if (entry.isIntersecting) {
              video.volume = 0.5;
              video.play(); // Play the video when in the viewport on the mobile only
            } else if (video) {
              video.pause(); // Pause the video when out of the viewport for monbile only
            }
          });
        },
        { threshold: 0.5 }
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

  const handleMouseEnter = () => {
    if (!isTouchDevice && videoRef.current) {
      videoRef.current.volume = 0.5;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice && videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <video
      ref={videoRef}
      controls
      width="100%"
      playsInline
      onMouseEnter={handleMouseEnter} // Play video when hovered (for non-touch devices)
      onMouseLeave={handleMouseLeave}
    >
      <source src={src} type="video/mp4" />
      browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
