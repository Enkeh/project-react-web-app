import * as client from "./client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as followsClient from "../follows/client";

function UserDetails() {
  const [user, setUser] = useState(null);
  const { currentUser } = useSelector((state) => state.usersReducer);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const { id } = useParams();
  const fetchUser = async () => {
    const user = await client.findUserById(id);
    setUser(user);
    fetchFollowers(user._id);
    fetchFollowing(user._id);
  };
  const follow = async () => {
    await followsClient.createUserFollowsUser(currentUser._id, user._id);
  };

  const fetchFollowers = async (userId) => {
    const followers = await followsClient.findUsersFollowingUser(userId);
    setFollowers(followers);
  };

  const fetchFollowing = async (userId) => {
    const following = await followsClient.findUsersFollowedByUser(userId);
    setFollowing(following);
  };

  const alreadyFollowing = () => {
    return followers.find(
      (follows) => follows.follower._id === currentUser._id
    );
  };

  useEffect(() => {
    fetchUser();
  }, [id]);
  return (
    <div className="container">
      {currentUser?._id !== id && (
        <>
          {alreadyFollowing() ? (
            <button className="btn btn-danger float-end">Unfollow</button>
          ) : (
            <button onClick={follow} className="btn btn-primary float-end">
              Follow
            </button>
          )}
        </>
      )}
      <h1>User Details</h1>
      {currentUser?.role === "ADMIN" && (
        <>
          <input
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            type="text"
            value={user?.username}
            className="form-control"
          />
          <button onClick={() => client.updateUser(user._id, user)}>
            Save
          </button>
        </>
      )}
      {currentUser?.role !== "ADMIN" && <>Username: "{user?.username}</>}
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(currentUser, null, 2)}</pre>
      <h2>Followers</h2>
      <div className="list-group">
        {followers.map((follows) => (
          <Link
            to={`/users/${follows.follower._id}`}
            key={follows._id}
            className="list-group-item"
          >
            {follows.follower.firstName} {follows.follower.lastName} (@
            {follows.follower.username})
          </Link>
        ))}
      </div>
      <h2>Following</h2>
      <div className="list-group">
        {following.map((follows) => (
          <Link
            to={`/users/${follows.followed._id}`}
            key={follows._id}
            className="list-group-item"
          >
            {follows.followed.firstName} {follows.followed.lastName} (@
            {follows.followed.username})
          </Link>
        ))}
      </div>
    </div>
  );
}

export default UserDetails;
