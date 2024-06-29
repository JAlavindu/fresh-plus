import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ExploreMenu.css";

const ExploreMenu = ({ setSelectedAdmin, setClickedAll }) => {
  const [admins, setAdmins] = useState([]);
  const [activeAdminId, setActiveAdminId] = useState(null);

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/admin/admins"
        );
        setAdmins(response.data.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    }

    fetchAdmins();
  }, []);

  const handleAdminClick = (admin) => {
    setSelectedAdmin(admin);
    setActiveAdminId(admin._id);
    setClickedAll(false);
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <div className="center">
        <button
          onClick={() => {
            setClickedAll(true);
            setActiveAdminId(null);
          }}
        >
          View All Products
        </button>
        <br />
        <br />
      </div>
      <h1>Explore Farmers</h1>
      <div className="explore-menu-list">
        {admins.map((admin) => (
          <div
            key={admin._id}
            className={`explore-menu-list-item ${
              admin._id === activeAdminId ? "active" : ""
            }`}
            onClick={() => handleAdminClick(admin)}
          >
            <p>{admin.name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
