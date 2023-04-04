import React from "react";
import loaderImg from "../../assets/loader.gif";
import ReactDOM from "react-dom";
import "./Loader.css";



const Loader = () => {
    return ReactDOM.createPortal(
      <div className="wrapper">
        <div className="loader">
          <img src={loaderImg} alt="Loading..." />
        </div>
      </div>,
      document.getElementById("loader")
    );
  };
  
//   small loading in particular area
  export const SpinnerImg = () => {
    return (
      <div className="--center-all">
        <img src={loaderImg} alt="Loading..." />
      </div>
    );
  };
  
  export default Loader;