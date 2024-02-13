// ScrollContainer.js
import React from 'react';
import "./input.css";  // Assuming this is for additional styles
import { TestPhotos } from './TestPhotos';

const ScrollContainer = ({ photos = [] }) => {

  return (
    <div className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-50 p-16 w-full flex overflow-x-auto">
      {photos.length === 0 && (
        <div className="flex-shrink-0 flex">
          {/* Display the TestPhotos array when there are no photos */}
          {TestPhotos.map((testPhoto, index) => (
            <div key={index} className="w-52 h-96 object-cover mb-4 aspect-w-1080 aspect-h-2336 mr-6">
              {testPhoto}
            </div>
          ))}
        </div>
      )}
      {photos.map((photo, index) => (
        <div key={index} className="flex-shrink-0">
          {/* Set a fixed height (e.g., h-96) for the images */}
          <img src={photo.url} alt={`Photo ${index + 1}`} className="w-48 h-96 object-cover aspect-w-1080 aspect-h-2336 mr-4" />
        </div>
      ))}
    </div>
  );
};

export default ScrollContainer;
