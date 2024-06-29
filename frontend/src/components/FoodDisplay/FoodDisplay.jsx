import React, { useContext, useEffect, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import axios from "axios";
import Modal from "react-modal";

const FoodDisplay = ({ selectedAdmin, clickedAll }) => {
  const { food_list, url } = useContext(StoreContext);
  const [adminItems, setAdminItems] = useState([]);
  const [admin, setAdmin] = useState("");

  const [allProducts, setAllProducts] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`${url}/api/admin/getAll`);
      setAllProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching  items:", error);
    }
  };

  const fetchAdmin = async () => {
    try {
      const response2 = await axios.post(`${url}/api/admin/get-admin`, {
        adminId: selectedAdmin._id,
      });
      setAdmin(response2.data.data);
      setModalIsOpen(true);
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
          <h2 className="title-heading">All Products</h2> <br />
          <div className="food-display-list">
            {allProducts.map((item) => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                adminName={item.adminName}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
      ) : selectedAdmin ? (
        <div>
          <button className="view-info" onClick={() => fetchAdmin()}>
            View Details of {selectedAdmin.name}
          </button>
          <h2 className="title-heading">Products of {selectedAdmin.name}</h2>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            className="modal"
            overlayClassName="modal-overlay"
          >
            <div className="modal-content">
              <h2 className="modal-title">Farmer Info</h2>
              <div className="delivery-info">
                <p className="delivery-info-item">
                  Name: <b>{admin.name}</b>
                </p>
                <p className="delivery-info-item">
                  Situated: <b>{admin.city}</b>
                </p>
                <p className="delivery-info-item">
                  Contact: <b>{admin.email}</b>
                </p>

                <button
                  className="modal-close-button"
                  onClick={() => setModalIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
          <div className="food-display-list">
            {adminItems.map((item) => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                adminName={item.adminName}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <h2 className="title-heading">All Products</h2>
          <div className="food-display-list">
            {allProducts.map((item) => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                adminName={item.adminName}
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
