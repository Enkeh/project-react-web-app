import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as curatedClient from "./curated/client";
import * as serviceClient from "./service";
import missing from "./images/MissingThumbnail.png";

function Home() {
  const [curatedShows, setCuratedShows] = useState([]);

  const fetchCurated = async () => {
    const curatedShows = await curatedClient.findAllCurated();
    setCuratedShows(curatedShows);
  }

  useState(() => {
    fetchCurated();
  }, []);

  return (
    <div className="wd-green-page wd-full">
      <div className="container wd-white-background" style={{borderBottomLeftRadius:"26px", borderBottomRightRadius:"26px"}}>
        <h2 className="wd-black">Curated Collection</h2>
        {!curatedShows.length && (
            <span className="wd-black"> No shows in the curated collection. </span>
        )}
        <div className="list-group">
          {curatedShows.map((show) => (
          <div className = "mb-2">
            <div key={show.showId} style={{height: 40, backgroundColor:"white", borderRadius:"8px", border:"1px solid #211601"}}>
              <Link to={`/details/${show.showId}`} style={{"text-decoration":"none"}}>
                <img src={serviceClient.showImageUrl(show.showId, true)} onError={(e)=>{e.target.onerror = null; e.target.src=missing}}
                  style={{ width:39, height:39, "border":"solid 1px #211601", borderRadius:"6px", float:"left", marginRight:"12px"}}/>
                <Link className="wd-showTitles float-end" to={`/profile/${show.user}`} style={{marginRight:"12px", "text-decoration":"none"}}>Added by: @{show.userName} </Link> 
                <p className="wd-showTitles">{show.showName} </p> 
              </Link>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;