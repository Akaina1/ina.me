// frontend/fetchPhotos.js
import axios from 'axios';

async function fetchPhotos() {
  try {
    const response = await axios.get('https://ina-me-backend.fly.dev/fetch-photos');
    return response.data;
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
}

export default fetchPhotos;