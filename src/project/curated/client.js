import axios from "axios";
const request = axios.create({
  withCredentials: true,
});

const CURATED_API = "http://localhost:4000/api";

export const findAllCurated = async () => {
  const response = await request.get(`${CURATED_API}/curated`);
  return response.data;
};
export const createUserCuratedShow = (userId, showId, userName, showName) => {
  const response = request.post(
    `${CURATED_API}/users/${userId}/curated/${showId}/${userName}/${showName}`
  );
  return response.data;
};
export const deleteUserCuratedShow = async (showId) => {
  const response = request.delete(
    `${CURATED_API}/users/curated/${showId}`
  );
  return response.data;
};
export const findShowsUserCurated = async (userId) => {
  const response = await request.get(`${CURATED_API}/show/${userId}/curated`);
  return response.data;
};
export const findUsersWhoCuratedShow = async (showId) => {
  const response = await request.get(`${CURATED_API}/shows/${showId}/curated`);
  return response.data;
};
export const findIfUserCuratedShow = async (userId, showId) => {
  const response = await request.get(`${CURATED_API}/shows/${userId}/curated/${showId}`);
  return response.data;
};