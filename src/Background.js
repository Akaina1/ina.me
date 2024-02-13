// BackgroundVideo.js
import React from 'react';

const BackgroundVideo = () => {
  return (
    <div className="z-0 absolute top-0 left-0 w-full h-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
        style={{ width: '100%', height: '100%' }}
      >
        <source src="IMG/InaBG.mp4" type="video/mp4" media="(min-width: 1025px)" />
        <source src="IMG/InaBG-tablet.mp4" type="video/mp4" media="(max-width: 1024px) and (min-width: 600px)" />
        <source src="IMG/InaBG-mobile.mp4" type="video/mp4" media="(max-width: 599px)" />
        Your browser does not support the video tag.
      </video>
      <style>
        {`
          @media (max-width: 1024px) {
            body {
              overflow: hidden;
              height: 100vh;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BackgroundVideo;