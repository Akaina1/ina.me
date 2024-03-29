import React, { useEffect, useState, useRef } from 'react';
import "./input.css";  // Assuming this is for additional styles
import fetchPhotos from './fetchPhotos';  // Update the path accordingly

const ScrollContainer = () => {
  const [photos, setPhotos] = useState([]);
  const [visiblePhotos, setVisiblePhotos] = useState([]);
  const containerRef = useRef(null);
  const [lastVisibleIndex, setLastVisibleIndex] = useState(0);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const fetchedPhotos = await fetchPhotos();
        setPhotos(fetchedPhotos);
      } catch (error) {
        console.error('Error fetching photos:', error.message);
      }
    };

    getPhotos();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add more photos to the visiblePhotos array
            const nextVisibleIndex = lastVisibleIndex + 1;
            const remainingPhotos = photos.slice(lastVisibleIndex, nextVisibleIndex);
            setVisiblePhotos((prevVisiblePhotos) => [...prevVisiblePhotos, ...remainingPhotos]);
            setLastVisibleIndex(nextVisibleIndex);
          }
        });
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [photos, lastVisibleIndex]);

  return (
    <div ref={containerRef} className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-10 w-full flex overflow-x-auto">
      {visiblePhotos.length > 0 && (
        <div className="flex-shrink-0 flex">
          {/* Display the fetched photos */}
          {visiblePhotos.map((photoFilename, index) => (
            <div key={index} className="w-56 h-100 object-cover mb-4 aspect-w-1080 aspect-h-2336 mr-4">
              <img
                src={`https://ina-gallery.fly.dev/photos/${encodeURIComponent(photoFilename)}`}
                alt={`${index + 1}`}
                className="w-full h-full object-cover"
                loading='lazy'
              />
            </div>
          ))}
        </div>
      )}
      {/* Add a loading indicator or message if photos are being fetched */}
      {photos.length === 0 && <p>Loading photos...</p>}
    </div>
  );
};

export default ScrollContainer;