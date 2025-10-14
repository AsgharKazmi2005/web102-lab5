import React from "react";

const Gallery = ({ images }) => {
  return (
    <div className="gallery-container">
      <h2>Previous Screenshots</h2>
      {images.length > 0 ? (
        <div className="gallery">
          {images.map((url, index) => (
            <img key={index} src={url} alt={`Screenshot ${index}`} className="gallery-image" />
          ))}
        </div>
      ) : (
        <p>No screenshots yet!</p>
      )}
    </div>
  );
};

export default Gallery;
