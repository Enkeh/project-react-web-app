import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as client from "./service";
function Search() {
  const  { state } = useLocation();
  const [searchResults, setSearchResults] = useState(null);
  const [searchText, setSearchText] = useState(state);

  const searchForShows = async (text) => {
    const results = await client.fullTextSearch(text);
    setSearchResults(results.tv_shows);
  };

  useEffect(() => {
    searchForShows(state?state:"");
  }, []);

  return (
    <div>
      <h1>Project</h1>
      <button
        className="btn btn-primary float-end"
        onClick={() => searchForShows(searchText)}
      >
        Search
      </button>
      <input
        value={searchText}
        className="form-control w-50"
        onChange={(e) => setSearchText(e.target.value)}
      />
      {searchResults &&
        searchResults.map((show) => (
          <div key={show.id}>
            <Link to={`/show/${show.id}`}>
              <img src={client.showImageUrl(show, true)} />
              <h3>{show.name}</h3>
            </Link>
          </div>
        ))}
      <pre>{JSON.stringify(searchResults, null, 2)}</pre>
    </div>
  );
}

export default Search;
