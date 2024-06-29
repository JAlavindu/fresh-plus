import React, { useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../farmer-assets/assets";
import { NavLink } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Sidebar = () => {
  const { token, hasProcessingOrders } = useContext(StoreContext);

  if (!token) {
    return null;
  }

  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add} alt="Add Product" />
          <p>Add Product</p>
        </NavLink>
        <NavLink to="/add-subscription" className="sidebar-option">
          <img src={assets.add} alt="Add Subscription" />
          <p>Add Subscription</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={assets.list} alt="List Products" />
          <p>List Products</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <img src={assets.orders} alt="Orders" />
          <p>
            Orders {hasProcessingOrders && <span className="green-dot"></span>}
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
