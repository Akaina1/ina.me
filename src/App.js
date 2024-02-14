import React, { useEffect } from 'react';
import BackgroundVideo from './Background';
import ScrollContainer from './ScrollContainer';
import initAndFetchPhotos from './functions/fetchPhotos'; // Adjust the path accordingly
import './input.css';

const App = () => {
  useEffect(() => {
    // Call your fetch function here when the component mounts
    initAndFetchPhotos();
  }, []);

  return (
    <div className="app bg-primary relative h-screen flex items-center justify-center">
      <BackgroundVideo />
      <ScrollContainer />
      {/* Your other components/content go here */}
    </div>
  );
};

export default App;