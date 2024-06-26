import React, { useContext, useEffect, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import axios from "axios";

const FoodDisplay = ({ selectedAdmin, clickedAll }) => {
  const { food_list, url } = useContext(StoreContext);
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
    <div className="food-display" id="food-display">
      {clickedAll ? (
        <div>
          Top Products near you <br />
          <div className="food-display-list">
            {allProducts.map((item) => (
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
        </div>
      ) : selectedAdmin ? (
        <div>
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
        </div>
      ) : (
        <>
          <h1>Top Products near you </h1>
          <br />
          <div className="food-display-list">
            {allProducts.map((item) => (
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
        </>
      )}
    </div>
  );
};

export default FoodDisplay;
