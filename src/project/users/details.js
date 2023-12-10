import * as client from "./client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as followsClient from "../follows/client";
import * as likesClient from "../likes/client";
import * as serviceClient from "../service";
import missing from "../images/MissingThumbnail.png";

function UserDetails() {
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.usersReducer);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [likedShows, setLikedShows] = useState([]);
  const { id } = useParams();
  const [alreadyFollowing, setAlreadyFollowing] = useState(null);

  const fetchUser = async () => {
    const user = await client.findUserById(id);
    setUser(user);
    fetchFollowers(user._id);
    fetchFollowing(user._id);
    fetchLikes(user._id);
  };

  const follow = async () => {
    await followsClient.createUserFollowsUser(currentUser._id, user._id);
    fetchFollowers(user._id);
  };

  const unfollow = async () => {
    await followsClient.deleteUserFollowsUser(currentUser._id, user._id);
    fetchFollowers(user._id);
  };

  const fetchFollowers = async (userId) => {
    const followers = await followsClient.findUsersFollowingUser(userId);
    setFollowers(followers);
    setAlreadyFollowing(followers.find((follows) => follows.follower._id === currentUser?._id)?true:false);
  };

  const fetchFollowing = async (userId) => {
    const following = await followsClient.findUsersFollowedByUser(userId);
    setFollowing(following);
  };

  const fetchLikes = async (userId) => {
    const likedShows = await likesClient.findShowsUserLikes(userId);
    setLikedShows(likedShows);
  }

  useEffect(() => {
    fetchUser();
  }, [id]);
  return (
    <div className="wd-green-page wd-full">
      <div className="container" align="center">
        <div style={{"maxWidth":"600px"}}>
          {currentUser?._id !== id && currentUser && (
            <>
              {alreadyFollowing ? (
                <button onClick={unfollow} className="btn wd-genericButton float-end mt-4 mb-2" style={{"width":"100px"}}>Unfollow</button>
              ) : (
                <button onClick={follow} className="btn wd-alternateButton float-end mt-4 mb-2" style={{"width":"100px"}}>Follow</button>
              )}
            </>
          )}
          <h2 className="pt-4 mb-2 wd-black" align="left">{user?.username}'s Profile</h2>
          <hr className="wd-black"/>
          {currentUser?.role === "ADMIN" && (
            <>
              <div className="btn-group mb-2" style={{"width":"100%"}}>
                <input
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  type="text"
                  value={user?.username}
                  className="form-control me-2"
                  style={{"border":"1px solid #211601"}}
                />
                <button className="wd-genericButton" onClick={() => client.updateUser(user._id, user)} style={{"width":"100px","borderRadius":"6px"}}>
                  Save
                </button>
              </div>
              
            </>
          )}
          <div className="mb-2 wd-black" style={{"border":"1px solid #211601", "backgroundColor":"white","borderRadius":"6px"}} align="left">
            <p className="ps-2 pt-2 pe-2">
              First Name: {user?.firstName}<br/>
              Last Name: {user?.lastName}<br/>
              Bio: {user?.bio}
            </p>
          </div>

         <h2 className="wd-black">Following</h2>
          {!following.length && (
              <span className="wd-black"> Following none. </span>
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
              <span className="wd-black"> None following. </span>
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
          <h2 className="wd-black">Liked Shows</h2>
          {!likedShows.length && (
              <span className="wd-black"> No shows liked. </span>
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

export default UserDetails;
