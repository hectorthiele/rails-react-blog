import React from "react";
import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <div className="loading">
      <ReactLoading type='spin' color="#000000" />
    </div>
  );
};

export default Loading;