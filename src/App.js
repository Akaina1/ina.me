// App.js
import React from 'react';
import BackgroundVideo from './Background';
import ScrollContainer from './ScrollContainer';
import "./input.css"


const App = () => {
  return (
    <div className="app bg-primary relative h-screen flex items-center justify-center">
      <BackgroundVideo />
      <ScrollContainer />
      {/* Your other components/content go here */}
    </div>
  );
};

export default App;