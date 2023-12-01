import axios from "axios";

const EPISODATE_API = "https://www.episodate.com/api";
const EPISODATE_IMAGE_URL = "https://static.episodate.com/images";

export const showImageUrl = (show, thumbnail=false) =>
  `${EPISODATE_IMAGE_URL}/tv-show/${thumbnail?"thumbnail":"full"}/${show.id}.jpg`;

export const fullTextSearch = async (text) => {
  const response = await axios.get(
    `${EPISODATE_API}/search/?q=${text}&page=1`
  );
  return response.data;
};

export const fetchShowById = async (showId) => {
  const response = await axios.get(
    `${EPISODATE_API}/show-details?q=${showId}`
  );
  return response.data;
};