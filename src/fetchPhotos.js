// frontend/fetchPhotos.js
import axios from 'axios';

const baseURL = 'http://localhost:3001' || 'https://ina-me-backend.fly.dev'; // Update with your preferred environment variable or configuration

const fetchPhotos = async () => {
    try {
        const response = await axios.get(`${baseURL}/api/photos`);
        const photos = response.data.photos;
        console.log('Fetched photos from server:', photos);
    } catch (error) {
        console.error('Error fetching photos from server:', error.message);
    }
};

export default fetchPhotos;