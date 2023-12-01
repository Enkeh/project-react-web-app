import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as client from "./service";
import * as likesClient from "./likes/client";
import * as userService from "./users/client";
import { useState } from "react";
import ProtectedContent from "./users/protectedContent";
function ShowDetails() {
  const [show, setShow] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { id } = useParams();

  const fetchShow = async (id) => {
    const result = await client.fetchShowById(id);
    setShow(result.tvShow);
  };
  const like = async () => {
    await likesClient.createUserLikesShow(currentUser._id, id);
  };
  const fetchCurrentUser = async () => {
    const user = await userService.account();
    setCurrentUser(user);
  };

  useEffect(() => {
    fetchShow(id);
    console.log(id);
    console.log(show);
    fetchCurrentUser();
  }, [id]);

  return (
    <div>
      {show && (
        <>
          <ProtectedContent>
            <button onClick={like} className="btn btn-primary float-end">
              Like
            </button>
            <button className="btn btn-danger float-end">Unlike</button>
          </ProtectedContent>
          <h1>{show.name}</h1>
          <img src={client.showImageUrl(show)} />
          <p>Status: {show.status}</p>
          <p>Network: {show.network}</p>
          <p>Country: {show.country}</p>
        </>
      )}
    </div>
  );
}

export default ShowDetails;
