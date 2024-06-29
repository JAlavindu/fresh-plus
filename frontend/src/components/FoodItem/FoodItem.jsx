import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";
import ProductInfo from "../ProductInfo/ProductInfo";

const FoodItem = ({ id, name, adminName, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  console.log(id);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          alt="food item"
          src={url + "/images/" + image}
        />
        {/* {!cartItems[id] ? (
          <img
            className="add"
            src={assets.add_icon_white}
            alt=""
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              alt=""
              onClick={() => removeFromCart(id)}
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              alt=""
              onClick={() => addToCart(id)}
            />
          </div>
        )} */}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">From {adminName}</p>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">1 kg - Rs. {price}</p>

        <Link to={`/product-info/${id}`} className="food-item-link">
          <button>View</button>
        </Link>
      </div>
    </div>
  );
};

export default FoodItem;
