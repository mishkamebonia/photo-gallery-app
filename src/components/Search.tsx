import { useEffect, useState } from "react";
import { accessKey, url } from "../config/apiKey";
import "../css/search.css";

const Search = () => {
  const [inputValue, setInputValue] = useState("");

  const perPage = 20;
  const order = "popular";

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setInputValue(e.target.value);
  };

  return (
    <div>
      <input
        type="search"
        value={inputValue}
        onChange={handleSearch}
        className="search"
        placeholder="Search image"
      />
    </div>
  );
};

export default Search;
