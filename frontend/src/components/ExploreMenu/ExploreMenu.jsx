import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ExploreMenu.css";

const ExploreMenu = ({ setSelectedAdmin, setClickedAll }) => {
  const [admins, setAdmins] = useState([]);

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

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Farmers</h1>
      <div className="explore-menu-list">
        {admins.map((admin) => (
          <div
            key={admin._id}
            className="explore-menu-list-item"
            onClick={() => setSelectedAdmin(admin)}
          >
            <p onClick={() => setClickedAll(false)}>{admin.name}</p>
          </div>
        ))}
      </div>
      <div className="center">
        <button onClick={() => setClickedAll(true)}>All</button>
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
