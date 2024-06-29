import React, { useEffect, useState, useContext } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets/assets";
import formatDateTime from "../../utils/formatDateTime";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const { token } = useContext(StoreContext);

  // API call
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

      setList(itemsArray);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.post(
        url + "/api/subscription/admin-subscriptions",
        {},
        { headers: { token } }
      );

      // Convert response.data.data object to an array of items
      const subscriptionsArray = Object.keys(response.data.data).map((key) => ({
        _id: key,
        ...response.data.data[key],
      }));

      setSubscriptions(subscriptionsArray);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  // API call
  const removeItem = async (itemId) => {
    try {
      const response = await axios.post(
        `${url}/api/admin/remove-item`,
        { id: itemId },
        { headers: { token } }
      );
      await fetchItems();

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const removeSubscription = async (itemId) => {
    try {
      const response = await axios.post(
        `${url}/api/subscription/remove-admin-subscription`,
        { subscriptionId: itemId }
      );
      await fetchSubscriptions();

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchItems();
      fetchSubscriptions();
    }
  }, [token]);

  return (
    <div>
      <div className="list add flex-col">
        <p>All Products</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Amount</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.amount}</p>
              <p>Rs.{item.price}</p>
              <div className="actions">
                <p onClick={() => removeItem(item._id)} className="cursor">
                  Edit
                </p>
                <p onClick={() => removeItem(item._id)} className="cursor">
                  Remove
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="list add flex-col">
        <p>All Subscriptions</p>
        <div className="list-table">
          <div className="list-table-format-subscription title">
            <b>Image</b>
            <b>Name</b>
            <b>Description</b>
            <b>Validity</b>
            <b>Price</b>
            <b>Date</b>
            <b>Action</b>
          </div>
          {subscriptions.map((item, index) => {
            const { date, time } = formatDateTime(item.date);
            return (
              <div key={index} className="list-table-format-subscription">
                <img src={assets.parcel_icon} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.description}</p>
                <p>{item.validity} days</p>
                <p>Rs.{item.price}</p>
                <p>{date}</p>
                <div className="actions">
                  <p
                    onClick={() => removeSubscription(item._id)}
                    className="cursor"
                  >
                    Edit
                  </p>
                  <p
                    onClick={() => removeSubscription(item._id)}
                    className="cursor"
                  >
                    Remove
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default List;
