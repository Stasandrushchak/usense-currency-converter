import React from "react";
import { Audio } from "react-loader-spinner";
import "./Loader.css";

export const Loader: React.FC = () => {
  return (
    <div className="loader-wrapper">
      <Audio
        height="100"
        width="100"
        color="#ffd700"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
    </div>
  );
};
