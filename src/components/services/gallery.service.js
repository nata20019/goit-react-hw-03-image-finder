import axios from 'axios';

const API_KEY = '49707208-ae8e491fbb4cb60d419a5399f';
const BASE_URL = 'https://pixabay.com/api/';

// export function fetchImages(query, page = 1) {
//   return axios(
//     `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
//   );
// }

export const fetchImages = async (query, page = 1) => {
  const params = new URLSearchParams({
    q: query,
    page: page,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

  try {
    const response = await axios.get(`${BASE_URL}?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};
