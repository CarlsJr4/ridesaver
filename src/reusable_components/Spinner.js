import React from 'react';
import Loader from 'react-loader-spinner';

const Spinner = () => {
  return (
    <div>
      <p>Retrieving passenger data...</p>
      <Loader type="Oval" />
    </div>
  );
};

export default Spinner;
