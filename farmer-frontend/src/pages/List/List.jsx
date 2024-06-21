import React, { useEffect, useState, useContext } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

const List = ({ url }) => {
  const [list, setList] = useState([]);
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

  useEffect(() => {
    if (token) {
      fetchItems();
    }
  }, [token]);

  return (
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
            <p onClick={() => removeItem(item._id)} className="cursor">
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
