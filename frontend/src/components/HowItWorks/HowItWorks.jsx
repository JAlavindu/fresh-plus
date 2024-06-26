import React from "react";
import "./HowItWorks.css";
import { assets } from "../../assets/assets";

const HowItWorks = () => {
  return (
    <>
      <div className="main">
        <h2 className="head">How It Works</h2>
        <div className="how-it-works">
          <div className="desc">
            <img src={assets.man} className="image"></img>
            <h2>hi</h2>
          </div>

          <div className="desc">
            <img src={assets.farm} className="image"></img>
            <h2>hi</h2>
          </div>

          <div className="desc">
            <img src={assets.farmer} className="image"></img>
            <h2>hi</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
