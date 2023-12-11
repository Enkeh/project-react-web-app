import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as watchedClient from "./watched/client";
import * as curatedClient from "./curated/client";
import * as serviceClient from "./service";
import missing from "./images/MissingFull.png";

function Home() {
  const { currentUser } = useSelector((state) => state.usersReducer);
  const [watchedShows, setWatchedShows] = useState([]);
  const [curatedShows, setCuratedShows] = useState([]);
  const [popular, setPopular] = useState(null);

  const fetchCurated = async () => {
    const curatedShows = await curatedClient.findAllCurated();
    setCuratedShows(curatedShows);
  }

  const fetchPopular = async () => {
    const popular = await serviceClient.popularShows(1);
    setPopular(popular.tv_shows.slice(0, 5));
  }
  
  const fetchWatched = async (userId) => {
    if(userId) {
      const userWatched = await watchedClient.findShowsUserWatched(userId);
      setWatchedShows(userWatched);
    }
  }

  useState(() => {
    fetchCurated();
    fetchPopular();
    fetchWatched(currentUser?._id);
  }, []);

  return (
    <div className="wd-green-page wd-full">
      <div className="container wd-white-background" style={{borderBottomLeftRadius:"26px", borderBottomRightRadius:"26px", paddingBottom:"5px"}}>
        <h2 className="wd-black pt-4">Trending Shows</h2>
        <div className="row m-1 d-flex" style={{backgroundColor:"#211601", borderRadius:"24px", "paddingTop":"12px", "paddingBottom":"12px", "paddingRight":"12px"}}>
        {popular &&
          popular.map((show) => (
            <div key={show.id} className="col" style={{"padding-right":"0px"}}>
              <Link to={`/details/${show.id}`} style={{"text-decoration":"none"}}>
                <img src={serviceClient.showImageUrl(show.id, false)} onError={(e)=>{e.target.onerror = null; e.target.src=missing}}
                  style={{"max-width": "100%", "height":"100%", "border":"solid 5px #1A8855", borderRadius:"16px"}}/>
              </Link>
            </div>
          ))}
        </div>
        <hr className="wd-black"/>
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
        {currentUser && (
          <>
            <h2 className="wd-black">Watchlisted Shows</h2>
            {!watchedShows.length && (
                <span className="wd-black"> Watchlist shows to see them here! </span>
            )}
            <div className="list-group">
              {watchedShows.map((show) => (
              <div className = "mb-2">
                <div key={show.showId} style={{height: 40, backgroundColor:"white", borderRadius:"8px", border:"1px solid #211601"}}>
                  <Link to={`/details/${show.showId}`} style={{"text-decoration":"none"}}>
                    <img src={serviceClient.showImageUrl(show.showId, true)} onError={(e)=>{e.target.onerror = null; e.target.src=missing}}
                      style={{ width:39, height:39, "border":"solid 1px #211601", borderRadius:"6px", float:"left", marginRight:"12px"}}/>
                    <p className="wd-showTitles">{show.showName} </p> 
                  </Link>
                </div>
              </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;