import axios from 'axios';

const API_KEY = '36502661-e8ee83efff2e99e0261d33261';
const URL = 'https://pixabay.com/api/';
export const quntityPage = 12;
const options = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
  per_page: quntityPage,
}).toString();

export const getApiImageGallery = async (dataSubmit, page) => {
  const response = await axios.get(
    `${URL}?key=${API_KEY}&q=${dataSubmit}&page=${page}&${options}`
  );
  return response;
};
