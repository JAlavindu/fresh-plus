import React from "react";
import "./ProductInfo.css";
import bananas from "./Bananas.jpeg";
import FoodItem from "../FoodItem/FoodItem";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const ProductInfo = ({ selectedAdmin }) => {
  const { cartItems, addToCart, removeFromCart, food_list, url } =
    useContext(StoreContext);
  const [adminItems, setAdminItems] = useState([]);

  const [allProducts, setAllProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`${url}/api/admin/getAll`);
      setAllProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching  items:", error);
    }
  };

  useEffect(() => {
    const fetchAdminItems = async () => {
      try {
        if (selectedAdmin && selectedAdmin._id) {
          const response = await axios.get(
            `${url}/api/admin/get-items/${selectedAdmin._id}`
          );
          setAdminItems(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching admin items:", error);
      }
    };

    fetchAdminItems();
    fetchAllProducts();
  }, [selectedAdmin, url]);
  return (
    <>
      <div className="small-container">
        <div className="col-1">
          {/* product image */}
          <img src={bananas} alt="" id="ProductImg" />
        </div>
        <div className="col-2">
          <h1>Bananas</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <h3>Rs.200</h3>
          <select>
            <option>Select weight</option>
            <option value="100g">100g</option>
            <option value="200g">200g</option>
            <option value="250g">250g</option>
            <option value="300g">300g</option>
            <option value="400g">400g</option>
            <option value="500g">500g</option>
            <option value="1kg">1kg</option>
            <option value="2kg">2kg</option>
          </select>
          <div className="box">
            {/* quantity with adding option */}
            {/* <div className="qty">
              {!cartItems[id] ? (
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
              )}
            </div> */}

            <button type="button">Add Item</button>
          </div>
        </div>

        {/* farmer other products needs to be visible */}

        {/* <div className="food-display">
          Products of {selectedAdmin.name}
          <div className="food-display-list">
            {adminItems.map((item) => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div> */}
      </div>
    </>
  );
};

export default ProductInfo;
