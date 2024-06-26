import React from "react";
import "./Details.css";
import { assets } from "../../assets/assets";

const Details = () => {
  return (
    <>
      <h2 className="about-head">Connecting Farmers & Consumers</h2>

      <div className="connecting-farmers">
        <div className="desc">
          <img src={assets.leaf} alt="" />
          <p>
            Discover the freshest products at our store, where quality and taste
            meet for a healthy, delicious lifestyle. Shop now!
          </p>
        </div>

        <div className="desc">
          <img src={assets.walk} alt="" />
          <p>
            Skip the hassle of walking around; find and purchase all your fresh
            products conveniently in one place online.
          </p>
        </div>

        <div className="desc">
          <img src={assets.shopping} alt="" />
          <p>
            Save time and effortlessly add products to your cart for a
            convenient shopping experience.
          </p>
        </div>

        <div className="desc">
          <img src={assets.shield} alt="" />
          <p>
            Enjoy fresh products to boost immunity, enhance well-being, and
            safeguard against illnesses.
          </p>
        </div>
      </div>
    </>
  );
};

export default Details;
