import React, { useState, useContext } from "react";
import "./../Add/Add.css";
import { assets } from "../../assets/assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const AddSubscription = ({ url }) => {
  const { token } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    description: "",
    validity: "7",
    validityDescription: "",
    price: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // API call
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("validity", Number(data.validity));
    formData.append("validityDescription", data.validityDescription);
    formData.append("price", Number(data.price));

    try {
      const response = await axios.post(
        `${url}/api/admin/add-subscription`,
        formData,
        {
          headers: {
            token,
          },
        }
      );
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          validity: "7",
          validityDescription: "",
          price: "",
        });

        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding subscription:", error);
      toast.error("Error adding subscription");
    }
  };

  if (!token) {
    alert("Sign in !");
    window.location.replace("/"); // Redirect to home
    return; // Stop further execution
  }

  return (
    <div className="add">
      <form action="" className="flex-col" onSubmit={onSubmitHandler}>
        {/* <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
              style={{ width: image ? "150px" : "auto" }}
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div> */}

        <div className="add-product-name flex-col">
          <p>Subscription Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Subscription Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Type here"
            required
          ></textarea>
        </div>

        <div className="add-product-name flex-col">
          <p>Validity Description</p>
          <input
            onChange={onChangeHandler}
            value={data.validityDescription}
            type="text"
            name="validityDescription"
            placeholder="Twice a week"
            required
          />
        </div>

        <div className="add-category-price">
          <div className="add-price flex-col">
            <p>Subscription Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="Rs.1000"
              required
            />
          </div>
          <div className="add-price flex-col">
            <p>Subscription validity</p>
            <select
              onChange={onChangeHandler}
              value={data.validity}
              name="validity"
              required
            >
              <option value="7">7 days</option>
              <option value="30">1 month</option>
              <option value="90">3 months</option>
            </select>
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add Subscription
        </button>
      </form>
    </div>
  );
};

export default AddSubscription;
