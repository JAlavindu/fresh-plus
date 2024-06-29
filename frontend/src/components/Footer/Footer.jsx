import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" className="logo" />
          <p>copyright</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.instagram_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-right">
          <h2>FreshPlus</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-center">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>123-456-789</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">© 2024 FreshPlus. All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
