import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import './Loader.css';

const Loader = () => {
  return (
    <div className="LoaderContainer">
      {' '}
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#3f51b5"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
