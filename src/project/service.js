import axios from "axios";

const EPISODATE_API = "https://www.episodate.com/api";
const EPISODATE_IMAGE_URL = "https://static.episodate.com/images";

export const showImageUrl = (showId, thumbnail=false) =>
  `${EPISODATE_IMAGE_URL}/tv-show/${thumbnail?"thumbnail":"full"}/${showId}.jpg`;

export const fullTextSearch = async (text, page) => {
  const response = await axios.get(
    `${EPISODATE_API}/search/?q=${text}&page=${page}`
  );
  return response.data;
};

export const popularShows = async (page) => {
  const response = await axios.get(
    `${EPISODATE_API}/most-popular?page=:${page}`
  );
  return response.data;
};

export const fetchShowById = async (showId) => {
  const response = await axios.get(
    `${EPISODATE_API}/show-details?q=${showId}`
  );
  return response.data;
};