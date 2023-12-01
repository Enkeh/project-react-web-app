import axios from "axios";
const request = axios.create({
  withCredentials: true,
});

const LIKES_API = "http://localhost:4000/api";

export const findAllLikes = async () => {
  const response = await request.get(`${LIKES_API}/likes`);
  return response.data;
};
export const createUserLikesShow = (userId, showId) => {
  const response = request.post(
    `${LIKES_API}/users/${userId}/likes/${showId}`
  );
  return response.data;
};
export const findShowsUserLikes = (userId) => {
  const response = request.get(`${LIKES_API}/users/${userId}/likes`);
  return response.data;
};
export const findUsersWhoLikeShow = (showId) => {
  const response = request.get(`${LIKES_API}/shows/${showId}/likes`);
  return response.data;
};
