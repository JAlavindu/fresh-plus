import React from "react";
import "./AboutUs.css";
import { assets } from "../../assets/assets";

function AboutUs() {
  return (
    <>
      <div className="head" id="about-us">
        <h2>AboutUs</h2>
      </div>

      <div className="body">
        <div className="box1">
          <img src={assets.hand}></img>
        </div>

        <div className="box2">
          <h3>Who are we?</h3>
          <p>
            We are a team from University of Sri Jayewardenepura, that's have an
            startup idea to connect consumers and farmers directly through this
            platform.
          </p>
          <br></br>
          <h3>Why are we?</h3>
          <p>
            The main issue that we see is that, there are huge number of
            intermediaries in the vegetable selling process. Because of this,
            the cost of vegetables are sky rocketing and the profit to the
            farmers have become less. So, we thought on a platform that,
            consumers can directly connect with the farmers to purchase they're
            products and reduce the cost of the vegetables and to provide more
            value to the farmers.
          </p>
          <br></br>
          <h3>Tranceparancy</h3>
          <p>
            We believe in transparency and honesty. We are always here to help
            you. Details of farmers are clearly displayed for consumers,
            providing accountability & branding for farmers. Consumers can
            review the products and farmers.
          </p>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
