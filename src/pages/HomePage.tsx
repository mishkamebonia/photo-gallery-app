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
  const [typingTimeout, setTypingTimeout] = useState<number | undefined>(
    undefined
  );

  const perPage = 20;
  const order = "popular";
  const typingDelay = 1000;

  const fetchImages = async (query: string) => {
    try {
      let apiUrl = `${url}/photos?page=1&client_id=${accessKey}&order_by=${order}&per_page=${perPage}`;

      if (query) {
        apiUrl = `${url}/search/photos?page=1&client_id=${accessKey}&order_by=${order}&per_page=${perPage}&query=${query}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();
      const imagesData = data.results
        ? data.results.map((result: any) => ({
            id: result.id,
            urls: {
              small: result.urls.small,
            },
            description: result.alt_description || "",
          }))
        : [];

      setImages(imagesData);
    } catch (err) {
      console.error("Error ", err);
    }
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeoutId = setTimeout(() => {
      fetchImages(value);
    }, typingDelay);
    setTypingTimeout(timeoutId);
  };

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout, searchValue]);

  return (
    <div>
      <div>
        <input
          type="search"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className="search"
          placeholder="Search image"
        />
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
