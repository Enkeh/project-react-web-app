import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import * as client from "./service";
import { FaCaretLeft, FaCaretRight, FaMagnifyingGlass } from "react-icons/fa6";
import missing from "./images/MissingThumbnail.png";
import "./index.css";

function Search() {
  const { state } = useLocation();
  const [searchResults, setSearchResults] = useState(null);
  const [fullResults, setFullResults] = useState(null);
  const [searchText, setSearchText] = useState(state);
  const { query, page } = useParams();
  const searchForShows = async (text="", page=1) => {
    const results = await client.fullTextSearch(text, page);
    setSearchResults(results.tv_shows);
    setFullResults(results);
  };

  useEffect(() => {
    searchForShows(query, page);
  }, [query, page]);

  return (
    <div className="wd-green-page wd-full">
      <div className="container wd-white-background" style={{borderBottomLeftRadius:"26px", borderBottomRightRadius:"26px"}}>
        <form className="d-flex" role="search">
          <div className="wd-search py-2">
              <input type="searchTerm" className="wd-searchTerm" placeholder="Search"
                value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
              <Link className="wd-searchButton" to={"/search/" + searchText + "/1"}> <FaMagnifyingGlass /> </Link>
          </div>
        </form>
        {searchResults &&
          <>
          <div className="mb-2">
            <span className="wd-black"> {fullResults.total} results for "{query}" across {fullResults.pages} page(s).</span>
            <div style={{"float":"right"}}> 
              <Link className="wd-black" to={"/search/" + query + "/" + (parseInt(page) - 1)}> <FaCaretLeft /> </Link>
              <span className="wd-black">Page {page}</span>
              <Link className="wd-black" to={"/search/" + query + "/" + (parseInt(page) + 1)}> <FaCaretRight /> </Link>
            </div>
          </div>
          </>
        }
        {searchResults &&
          searchResults.map((show) => (
            <div style={{paddingBottom:"12px"}}>
              <div key={show.id} style={{height: 160, backgroundColor:"#211601", borderRadius:"16px"}}>
                <Link to={`/details/${show.id}`} style={{"text-decoration":"none"}}>
                  <img src={client.showImageUrl(show.id, true)} onError={(e)=>{e.target.onerror = null; e.target.src=missing}}
                    style={{ width:160, height:160, "border":"solid 5px #211601", borderRadius:"16px", float:"left", "margin-right":"10px"}}/>
                  <p className="wd-searchTitles">{show.name} </p> 
                  <p className="wd-searchDetails">Country: {show.country} | Network: {show.network} | Status: {show.status} </p>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Search;
