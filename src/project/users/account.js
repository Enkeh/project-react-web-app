import * as client from "./client";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as followsClient from "../follows/client";
import * as likesClient from "../likes/client";
import * as watchedClient from "../watched/client";
import * as serviceClient from "../service";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import missing from "../images/MissingThumbnail.png";

function Account() {
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [likedShows, setLikedShows] = useState([]);
  const [watchedShows, setWatchedShows] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const user = await client.account();
      setUser(user);
      fetchFollowing(user._id);
      fetchFollowers(user._id);
      fetchLikes(user._id);
      fetchWatched(user._id);
    } catch (error) {
      navigate("/signin");
    }
  };
  const signOut = async () => {
    await client.signOut();
    dispatch(setCurrentUser(null));
    navigate("/signin");
  };
  const updateUser = async () => {
    await client.updateUser(user._id, user);
  };

  const fetchFollowing = async (userId) => {
    const following = await followsClient.findUsersFollowedByUser(userId);
    setFollowing(following);
  };

  const fetchFollowers = async (userId) => {
    const followers = await followsClient.findUsersFollowingUser(userId);
    setFollowers(followers);
  };

  const fetchLikes = async (userId) => {
    const likedShows = await likesClient.findShowsUserLikes(userId);
    setLikedShows(likedShows);
  }

  const fetchWatched = async (userId) => {
    const watchedShows = await watchedClient.findShowsUserWatched(userId);
    setWatchedShows(watchedShows);
  }

  useState(() => {
    fetchUser();
  }, []);
  return (
    <div className="wd-green-page wd-full">
      <div className="container" align="center">
        <div style={{"maxWidth":"600px"}}>
          <h2 className="d-flex justify-content-center pt-4 mb-2 wd-black">Account Management</h2>
          <input
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            value={user?.password}
            className="form-control mb-2"
            style={{"border":"1px solid #211601"}}
            title="Password"
          />
          <input
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            type="text"
            value={user?.firstName}
            className="form-control mb-2"
            style={{"border":"1px solid #211601"}}
            placeholder="First Name"
            title="First Name"
          />
          <input
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            type="text"
            value={user?.lastName}
            className="form-control mb-2"
            style={{"border":"1px solid #211601"}}
            placeholder="Last Name"
            title="Last Name"
          />
          <input
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="text"
            value={user?.email}
            className="form-control mb-2"
            style={{"border":"1px solid #211601"}}
            placeholder="Email"
            title="Email"
          />
          <textarea
            onChange={(e) => setUser({ ...user, bio: e.target.value })}
            value={user?.bio}
            className="form-control mb-2"
            style={{"border":"1px solid #211601"}}
            placeholder="Hi! I'm new to Channeleon."
            title="Bio"
          />
          <div className="btn-group mb-2" style={{"width":"100%"}}>
            <button onClick={signOut} className="btn wd-alternateButton">
              Sign Out
            </button>
            <button onClick={updateUser} className="btn wd-genericButton ms-2">
              Save
            </button>
            {user?.role === "ADMIN" && (
              <Link to="/users" className="btn wd-genericButton ms-2">
                Users
              </Link>
            )}
          </div>
          <h2 className="wd-black">Following</h2>
          {!following.length && (
              <span className="wd-black"> Follow users to see them here! </span>
            )}
          <div className="list-group">
            {following.map((follows) => (
              <Link
                key={follows.followed._id}
                className="list-group-item"
                to={`/profile/${follows.followed._id}`}
                style={{"border":"1px solid #211601"}}
              >
                {follows.followed.firstName} {follows.followed.lastName} (@
                {follows.followed.username})
              </Link>
            ))}
          </div>
          <h2 className="wd-black">Followers</h2>
          {!followers.length && (
              <span className="wd-black"> Gain followers to see them here! </span>
          )}
          <div className="list-group">
            {followers.map((follows) => (
              <Link
                to={`/profile/${follows.follower._id}`}
                key={follows._id}
                className="list-group-item"
                style={{"border":"1px solid #211601"}}
              >
                {follows.follower.firstName} {follows.follower.lastName} (@
                {follows.follower.username})
              </Link>
            ))}
          </div>
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
          <h2 className="wd-black">Liked Shows</h2>
          {!likedShows.length && (
              <span className="wd-black"> Like shows to see them here! </span>
          )}
          <div className="list-group">
            {likedShows.map((show) => (
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
        </div>
      </div>
    </div>
  );
}

export default Account;
