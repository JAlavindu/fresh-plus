import React, { useContext, useEffect, useState } from "react";
import "./ProductInfo.css";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductInfo = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [adminItems, setAdminItems] = useState([]);
  const [selectedWeight, setSelectedWeight] = useState(1000); // Set default to 1kg in grams
  const [price, setPrice] = useState("");

  const { token, cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  useEffect(() => {
    const fetchProductAndAdminItems = async () => {
      try {
        // Fetch the selected product
        const productResponse = await axios.post(`${url}/api/item/get-item`, {
          itemId: id,
        });
        const selectedItem = productResponse.data.data;
        setItem(selectedItem);

        // Set the default price
        setPrice(selectedItem.price);

        // Fetch the products of the same admin
        if (selectedItem && selectedItem.adminId) {
          const adminItemsResponse = await axios.get(
            `${url}/api/admin/get-items/${selectedItem.adminId}`
          );
          setAdminItems(adminItemsResponse.data.data);
          console.log("admin items", adminItemsResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProductAndAdminItems();
  }, [id, url]);

  useEffect(() => {
    if (item) {
      // Update the price based on the selected weight
      const newPrice = (item.price * selectedWeight) / 1000; // Assuming item.price is for 1kg
      setPrice(newPrice);
    }
  }, [selectedWeight, item]);

  if (!item) {
    return <div>Loading...</div>;
  }

  if (!token) {
    window.location.href = "/";
  }

  return (
    <div>
      <div className="small-container">
        <div className="col-1">
          <img
            src={`${url}/images/${item.image}`}
            alt={item.name}
            id="ProductImg"
          />
        </div>
        <div className="col-2">
          <h1>{item.name}</h1>
          <br />
          <p>
            <b>{item.description}</b> Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Vero reiciendis commodi officiis eos atque totam
            quod quam natus, ad corrupti!
          </p>{" "}
          <br />
          <h3>
            {selectedWeight / 1000}kg - Rs.{price}
          </h3>
          <select
            value={selectedWeight}
            onChange={(e) => setSelectedWeight(Number(e.target.value))}
          >
            <option value={100}>100g</option>
            <option value={200}>200g</option>
            <option value={250}>250g</option>
            <option value={300}>300g</option>
            <option value={400}>400g</option>
            <option value={500}>500g</option>
            <option value={1000}>1kg</option>
            <option value={2000}>2kg</option>
          </select>
          <div className="box-new">
            <div className="qty-new">
              {!cartItems[`${id}-${selectedWeight}`] ? (
                <button
                  className="add-new"
                  type="button"
                  onClick={() => addToCart(id, selectedWeight)}
                >
                  Add Item
                </button>
              ) : (
                <div className="food-item-counter-new">
                  <button
                    className="remove-new"
                    type="button"
                    onClick={() => removeFromCart(id, selectedWeight)}
                  >
                    Remove Item
                  </button>
                  <p>{cartItems[`${id}-${selectedWeight}`]}</p>
                  <button
                    className="add-new"
                    type="button"
                    onClick={() => addToCart(id, selectedWeight)}
                  >
                    Add Item
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <h2 className="more-title">More from {item.adminName}</h2>
        <div className="related-products">
          {adminItems.map((adminItem) => (
            <FoodItem
              key={adminItem._id}
              id={adminItem._id}
              name={adminItem.name}
              adminName={adminItem.adminName}
              description={adminItem.description}
              price={adminItem.price}
              image={adminItem.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
