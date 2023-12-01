import { useEffect, useState } from "react";
import * as client from "./client";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

function CurrentUser({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      const user = await client.account();
      setUser(user);
      dispatch(setCurrentUser(user));
      setLoading(false);
      console.log("there");
    } catch (error) {
        console.log("anywhere");}
  };
  useEffect(() => {
    fetchUser();
    console.log("here");
  }, []);
  return <>{!loading && children}</>;
}

export default CurrentUser;