import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as client from "./service";
import * as likesClient from "./likes/client";
import * as watchedClient from "./watched/client";
import * as curatedClient from "./curated/client";
import { useState } from "react";
import { useSelector } from "react-redux";
import missing from "./images/MissingFull.png";

function ShowDetails() {
  const [show, setShow] = useState(null);
  const { currentUser } = useSelector((state) => state.usersReducer);
  const { id } = useParams();
  const [alreadyLiked, setAlreadyLiked] = useState([]);
  const [alreadyWatched, setAlreadyWatched] = useState([]);
  const [alreadyCurated, setAlreadyCurated] = useState([]);

  const fetchShow = async (id) => {
    const result = await client.fetchShowById(id);
    setShow(result.tvShow);
  };
  const like = async () => {
    await likesClient.createUserLikesShow(currentUser?._id, id, show.name);
    setAlreadyLiked(true);
  };
  const unlike = async () => {
    await likesClient.deleteUserLikesShow(currentUser?._id, id);
    setAlreadyLiked(false);
  };
  const fetchLiked = async (userId) => {
    if(userId) {
      const userLiked = await likesClient.findIfUserLikesShow(userId, id);
      setAlreadyLiked(JSON.stringify(userLiked)!=="[]");
    }
  }
  const watch = async () => {
    await watchedClient.createUserWatchedShow(currentUser?._id, id, show.name);
    setAlreadyWatched(true);
  };
  const unwatch = async () => {
    await watchedClient.deleteUserWatchedShow(currentUser?._id, id);
    setAlreadyWatched(false);
  };
  const curate = async () => {
    await curatedClient.createUserCuratedShow(currentUser?._id, id, currentUser?.username, show.name);
    console.log(currentUser?.name)
    setAlreadyCurated(true);
  };
  const uncurate = async () => {
    await curatedClient.deleteUserCuratedShow(id);
    setAlreadyCurated(false);
  };
  const fetchWatched = async (userId) => {
    if(userId) {
      const userWatched = await watchedClient.findIfUserWatchedShow(userId, id);
      setAlreadyWatched(JSON.stringify(userWatched)!=="[]");
    }
  }
  const fetchCurated = async () => {
    const curated = await curatedClient.findUsersWhoCuratedShow(id);
    setAlreadyCurated(JSON.stringify(curated)!=="[]");
  }

  // Below function from Geeks For Geeks; used to strip html tags from description
  const removeTags = (str) => {
    if ((str===null) || (str===''))
      return false;
    else
      str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '');
}

  useEffect(() => {
    fetchShow(id);
    fetchLiked(currentUser?._id);
    fetchWatched(currentUser?._id);
    fetchCurated();
  }, [id]);

  return (
    <div className="wd-green-page wd-full">
      <div className="container wd-white-background" style={{borderBottomLeftRadius:"26px", borderBottomRightRadius:"26px", minHeight:"530px"}}>
        {show && (
          <>
            {currentUser && (
              <>
                {alreadyWatched ? (
                  <button onClick={unwatch} className="btn wd-genericButton float-end mt-2" style={{"width":"200px"}}>Remove from Watchlist</button>
                    ) : (
                  <button onClick={watch} className="btn wd-alternateButton float-end mt-2" style={{"width":"200px"}}>Add to Watchlist</button>
                )}
                {alreadyLiked ? (
                  <button onClick={unlike} className="btn wd-genericButton float-end mt-2 me-2" style={{"width":"100px"}}>Unlike</button>
                    ) : (
                  <button onClick={like} className="btn wd-alternateButton float-end mt-2 me-2" style={{"width":"100px"}}>Like</button>
                )}
                {(currentUser?.role === "ADMIN" || currentUser?.role === "CURATOR") && (
                  <>
                    {alreadyCurated ? (
                      <button onClick={uncurate} className="btn wd-genericButton float-end mt-2 me-2" style={{"width":"200px"}}>Remove from Collection</button>
                        ) : (
                      <button onClick={curate} className="btn wd-alternateButton float-end mt-2 me-2" style={{"width":"200px"}}>Curate to Collection</button>
                    )}
                  </>
                )}
              </>
            )}
            <img src={client.showImageUrl(show.id)} style={{"border":"solid 5px #211601", float:"left", borderRadius:"16px", "maxWidth":"366px", "maxHeight":"510px"}} 
              onError={(e)=>{e.target.onerror = null; e.target.src=missing}} className="mt-2 me-2"/>
            <h1 className="pt-2 wd-black">{show.name}</h1>
            <div className="wd-black">
              <hr/>
              {removeTags(show.description)}<br/>
              <div className="btn-group mb-2 mt-2">
                {show.genres &&
                  show.genres.map((genre) => (
                    <span className="wd-genericButton me-2" style={{"width":"120px", "textAlign":"center"}}>{genre}</span>
                ))}
              </div>
              <p>Country: {show.country} | Network: {show.network} | Status: {show.status}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShowDetails;
