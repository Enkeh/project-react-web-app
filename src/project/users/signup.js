import React, { useState } from "react";
import * as client from "./client";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const signUp = async () => {
    try {
      const user = await client.signUp({ username, password });
      navigate("/account");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="wd-green-page wd-full">
      <div className="container" align="center">
        <div style={{"maxWidth":"600px"}}>
          <h2 className="d-flex justify-content-center pt-4 mb-2 wd-black">Sign Up Today</h2>
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
          <button className="btn wd-alternateButton mb-2" style={{"width":"100%"}} onClick={signUp}>
              Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
