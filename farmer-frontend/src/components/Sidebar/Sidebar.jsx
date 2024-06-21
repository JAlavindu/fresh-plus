import React, { useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Sidebar = () => {
  const { token } = useContext(StoreContext);

  if (!token) {
    return null;
  }

  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt="Add Product" />
          <p>Add Product</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={assets.order_icon} alt="List Products" />
          <p>List Products</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <img src={assets.add_icon} alt="Orders" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
