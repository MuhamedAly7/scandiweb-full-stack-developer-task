import { useEffect, useState } from "react";

function ImageGallery({ gallery }) {
  const [mainImage, setMainImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (gallery?.length) {
      setMainImage(gallery[0]);
    }
  }, [gallery]);

  const handleThumbnailClick = (src, index) => {
    setMainImage(src);
    setCurrentIndex(index);
  };

  const handlePrevClick = () => {
    const newIndex = (currentIndex - 1 + gallery.length) % gallery.length;
    setMainImage(gallery[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = (currentIndex + 1) % gallery.length;
    setMainImage(gallery[newIndex]);
    setCurrentIndex(newIndex);
  };

  if (!gallery?.length) {
    return <h2>No Images Available</h2>;
  }

  return (
    <div className="image-gallery" data-testid="product-gallery">
      <div className="thumbnails">
        {gallery.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${currentIndex === index ? "selected" : ""}`}
            onClick={() => handleThumbnailClick(src, index)}
          />
        ))}
      </div>
      <div className="main-image">
        <button className="prev" onClick={handlePrevClick}>
          ❮
        </button>
        <img src={mainImage} alt="Main" />
        <button className="next" onClick={handleNextClick}>
          ❯
        </button>
      </div>
    </div>
  );
}

export default ImageGallery;
