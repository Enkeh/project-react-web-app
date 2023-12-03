import * as client from "./client";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as followsClient from "../follows/client";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

function Account() {
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const user = await client.account();
      setUser(user);
      fetchFollowing(user._id);
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
          <div className="btn-group mb-2" style={{"width":"100%"}}>
            <button onClick={signOut} className="btn wd-genericButton">
              Sign Out
            </button>
            <button onClick={updateUser} className="btn wd-alternateButton ms-2">
              Save
            </button>
            {user?.role === "ADMIN" && (
              <Link to="/users" className="btn wd-genericButton ms-2">
                Users
              </Link>
            )}
          </div>
          <h2>Following</h2>
          {!following.length && (
              <span> Follow users to see them here! </span>
            )}
          <div className="list-group">
            {following.map((follows) => (
              <Link
                key={follows.followed._id}
                className="list-group-item"
                to={`/users/${follows.followed._id}`}
                style={{"border":"1px solid #211601"}}
              >
                {follows.followed.firstName} {follows.followed.lastName} (@
                {follows.followed.username})
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
