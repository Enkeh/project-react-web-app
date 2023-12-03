import React, { useState } from "react";
import * as client from "./client";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import "../index.css";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signIn = async () => {
    try {
      const user = await client.signIn({ username, password });
      dispatch(setCurrentUser(user));
      navigate("/account");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="wd-green-page wd-full">
      <div className="container" align="center">
        <div style={{"maxWidth":"600px"}}>
          <h2 className="d-flex justify-content-center pt-4 mb-2 wd-black">Please Sign In</h2>
          {error && <div className="alert alert-danger mb-2">{error}</div>}
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            value={username}
            placeholder="Username"
            className="form-control mb-2"
            style={{"border":"1px solid #211601"}}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            placeholder="Password"
            className="form-control mb-2"
            style={{"border":"1px solid #211601"}}
          />
          <div className="btn-group mb-2" style={{"width":"100%"}}>
            <button className="btn wd-alternateButton me-2" onClick={signIn}>
              Sign In
            </button>
            <Link className="btn wd-genericButton" to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
