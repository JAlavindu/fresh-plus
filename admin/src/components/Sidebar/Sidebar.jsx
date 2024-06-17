import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add} alt="add" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img src={assets.list}alt="list" />
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img src={assets.orders} alt="orders" />
                <p>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar