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

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=1&limit=10")
      .then((res) => {
        setIsLoading(true);
        return res.json();
      })
      .then((data) => {
        setImages(data);
        setIsLoading(false);
      });
  }, []);
  console.log("Images bruh", images);

  return (
    <div>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <div>
          {images.map((image) => (
            <img
              src={(image.download_url)}
              height={image.height}
              width={image.width}
              alt={image.author}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
