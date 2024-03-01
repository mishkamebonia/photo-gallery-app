import { accessKey, url } from "../config/apiKey";
import { useState, useEffect } from "react";
import "../css/grid.css";
import "../css/search.css";

interface Image {
  id: string;
  urls: {
    small: string;
  };
  description: string;
}

const HomePage = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const perPage = 20;
  const order = "popular";

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `${url}/search/photos?page=1&client_id=${accessKey}&order_by=${order}&per_page=${perPage}&query=${searchValue}`
      );
      const data = await response.json();
      const imagesData = data.results.map((result: any) => ({
        id: result.id,
        urls: {
          small: result.urls.small,
        },
        description: result.alt_description || "",
      }));
      setImages(imagesData);
    } catch (err) {
      console.error("Error ", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetchImages();
  };

  useEffect(() => {
    fetchImages();
  }, [searchValue]);

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="search"
            placeholder="Search image"
          />
        </form>
      </div>
      <div className="images-grid">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.description}
            className="image"
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
