import React from 'react';
import './Loader.css'; // Assuming the CSS is saved in a file named Loader.css in the same directory

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-content"></div>
    </div>
  );
};

export default Loader;
