/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./PhotoCarousel.css";

const PhotoCarousel = ({ payloadData }) => {
  // State to keep track of the current photo index
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Effect to cycle through photos every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) =>
        prevIndex === payloadData.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);
    return () => clearInterval(timer);
  }, [payloadData.length]);

  // Current photo data
  const currentPayload = payloadData[currentPhotoIndex];

  return (
    <div className="photo-carousel-container">
      <div className="photo-name">{currentPayload.name}</div>
      <img
        src={currentPayload.url}
        alt={currentPayload.name}
        className="photo"
      />
      <div className="photo-description">{currentPayload.description}</div>
    </div>
  );
};

export default PhotoCarousel;
