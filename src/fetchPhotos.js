const fetchPhotos = async () => {
    try {
      const response = await fetch('https://ina-gallery.fly.dev/photos'); // Update with your Fly.io URL
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      // Extract only the filenames from the folder structure
      const filenames = data.photos.map((photoPath) => {
        const parts = photoPath.split('/');
        return parts[parts.length - 1];
      });
      return filenames;
    } catch (error) {
      console.error('Error fetching photos:', error.message);
      return [];
    }
  };
  
  export default fetchPhotos;  