import axios from "axios";
const request = axios.create({
  withCredentials: true,
});

const WATCHED_API = process.env.REACT_APP_API_BASE;

export const findAllWatched = async () => {
  const response = await request.get(`${WATCHED_API}/watched`);
  return response.data;
};
export const createUserWatchedShow = (userId, showId, showName) => {
  const response = request.post(
    `${WATCHED_API}/users/${userId}/watched/${showId}/${showName}`
  );
  return response.data;
};
export const deleteUserWatchedShow = async (userId, showId) => {
  const response = request.delete(
    `${WATCHED_API}/users/${userId}/watched/${showId}`
  );
  return response.data;
};
export const findShowsUserWatched = async (userId) => {
  const response = await request.get(`${WATCHED_API}/show/${userId}/watched`);
  return response.data;
};
export const findUsersWhoWatchedShow = async (showId) => {
  const response = await request.get(`${WATCHED_API}/shows/${showId}/watched`);
  return response.data;
};
export const findIfUserWatchedShow = async (userId, showId) => {
  const response = await request.get(`${WATCHED_API}/shows/${userId}/watched/${showId}`);
  return response.data;
};