import React, { useEffect, useState, useContext } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets/assets";
import formatDateTime from "../../utils/formatDateTime";
import Modal from "react-modal";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const { token } = useContext(StoreContext);

  const [item, setItem] = useState("");
  const [modal1IsOpen, setModal1IsOpen] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "Vegetable",
    amount: 0,
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const save = async (event) => {
    event.preventDefault();

    let saveData = {
      itemId: item._id,
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      amount: data.amount,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/item/update-item",
        saveData,
        { headers: { token } }
      );

      if (response.data.success) {
        alert("Item details updated");
        setModal1IsOpen(false);
        window.location.reload("/list");
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  const fetchItem = async (itemId) => {
    // console.log(itemId);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/item/get-item",
        { itemId: itemId }
      );
      setItem(response.data.data);

      setData({
        name: response.data.data.name,
        description: response.data.data.description,
        price: response.data.data.price,
        category: response.data.data.category,
        amount: response.data.data.amount,
      });

      setModal1IsOpen(true);
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

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
                <p onClick={() => fetchItem(item._id)} className="cursor">
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
          <Modal
            isOpen={modal1IsOpen}
            onRequestClose={() => setModal1IsOpen(false)}
            className="modal"
            overlayClassName="modal-overlay"
          >
            <div className="modal-content">
              <h2 className="modal-title">Edit Information</h2>
              <div className="delivery-info">
                <form onSubmit={save}>
                  <p className="delivery-info-item">
                    Name:{" "}
                    <input
                      name="name"
                      onChange={onChangeHandler}
                      value={data.name}
                      type="text"
                      placeholder="name"
                      required
                    />
                  </p>
                  <p className="delivery-info-item">
                    Description:{" "}
                    <input
                      name="description"
                      onChange={onChangeHandler}
                      value={data.description}
                      type="text"
                      placeholder="description"
                      required
                    />
                  </p>
                  <p className="delivery-info-item">
                    Price:{" "}
                    <input
                      name="price"
                      onChange={onChangeHandler}
                      value={data.price}
                      type="number"
                      placeholder="price"
                      required
                    />
                  </p>
                  <p className="delivery-info-item">
                    Category:{" "}
                    <select
                      name="category"
                      onChange={onChangeHandler}
                      value={data.category}
                      required
                    >
                      <option value="Fruit">Fruit</option>
                      <option value="Vegetable">Vegetable</option>
                    </select>
                  </p>
                  <p className="delivery-info-item">
                    Amount:{" "}
                    <input
                      name="amount"
                      onChange={onChangeHandler}
                      value={data.amount}
                      type="number"
                      placeholder="amount"
                      required
                    />
                  </p>

                  <button type="submit" className="modal-close-button">
                    Update
                  </button>
                  <button
                    className="modal-close-button"
                    onClick={() => setModal1IsOpen(false)}
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default List;
