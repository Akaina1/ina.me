import React from 'react';
import BackgroundVideo from './Background';
import ScrollContainer from './ScrollContainer';
import "./input.css";

const App = () => {
  return (
    <div className="app bg-primary relative h-screen">
      <BackgroundVideo />
      <ScrollContainer />
      
      {/* Logo centered at the top */}
      <img
        src="/IMG/InaLogo.svg"
        alt="Ina Logo"
        className="z-5 absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-80 object-cover"
      />

      {/* Your other components/content go here */}
    </div>
  );
};

export default App;