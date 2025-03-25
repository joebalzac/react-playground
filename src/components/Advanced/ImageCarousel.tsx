import { useEffect, useState } from "react";

interface Image {
  id: number;
  url: string;
  download_url: string;
  author: string;
  width: number;
  height: number;
}

const ImageCarousel = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://picsum.photos/v2/list?page=1&limit=10")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setIsLoading(false);
      });
  }, []);

  const handleNextImage = () => {
    if (index === images.length - 1) {
      setIndex(0); 
    } else {
      setIndex(index + 1);
    }
  };

  const handlePrevImage = () => {
    if (index === 0) {
      setIndex(images.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div>
          <div>
            <button onClick={handlePrevImage}>Prev</button>
            <button onClick={handleNextImage}>Next</button>
          </div>
          {images[index] && (
            <img
              src={images[index].download_url}
              alt={images[index].author}
              width="600"
              height="400"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
