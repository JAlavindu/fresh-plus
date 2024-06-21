import axios from "axios";
import { useState, useEffect, useContext } from "react";
import FoodItem from "../Fooditem/Fooditem"; // Ensure you have this component
import { StoreContext } from "../../context/StoreContext";

const Fooddisplay = () => {
  const [foodList, setFoodList] = useState([]);
  const { url, token, setToken } = useContext(StoreContext);

  const fetchItems = async () => {
    try {
      const response = await axios.post(
        url + "/api/admin/get-items",
        {},
        { headers: { token } }
      );

      // Convert response.data.data object to an array of items
      const itemsArray = Object.keys(response.data.data).map((key) => ({
        _id: key,
        ...response.data.data[key],
      }));

      setFoodList(itemsArray);
      console.log(itemsArray);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="food-display" id="food-display">
      <br />
      <h2>My Products </h2>
      <div className="food-display-list">
        {foodList.map((item, index) => {
          return (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={`${url}/images/${item.image}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Fooddisplay;
