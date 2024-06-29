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
            <div className="content">
              <h2>Consumers</h2>

              <ul>
                <li>Order your favorite products from favorite farmers! </li>
                <li>Get your order delivered to your doorstep! </li>
                <li>Review the Product, Farmer & LocalFarmers Team</li>
                <li> Enjoy the fresh and healthy products!</li>
              </ul>
            </div>
          </div>

          <div className="desc">
            <img src={assets.farm} className="image"></img>
            <div className="content">
              <h2>FreshPlus</h2>
              <ul>
                <li>Register your farm on FreshPlus! </li>
                <li>Upload your products and set the price!</li>
                <li>Get orders from consumers and deliver the products!</li>
                <li>Get reviews from consumers and grow your busines</li>
              </ul>
            </div>
          </div>

          <div className="desc">
            <img src={assets.farmer} className="image"></img>
            <div className="content">
              <h2>Farmers</h2>
              <ul>
                <li>Register your farm on LocalFarmers!</li>
                <li>Upload your products and set the price!</li>
                <li>Get orders from consumers and deliver the products!</li>
                <li>Get reviews from consumers and grow your business!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
