import { useEffect, useState } from "react";

interface Image {}

const ImageCarousel = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=1&limit=5")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  return <div>ImageCarousel</div>;
};

export default ImageCarousel;
