import React, { useContext, useState } from 'react'
import './NavBar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const NavBar = ({setShowLogin}) => {
    const [menu, setMenu] = useState("home");
    const{getTotalCartAmount} = useContext(StoreContext);

  return (
    <div className='navbar'>
        {/* logo */}
        <div className='image'>
        <Link to='/'>
        <img src={assets.logo} alt='logo' className='logo'/>
        </Link>
        </div>
       
       
        <ul className='navbar-menu'>
            <Link to="/" className={menu==="home" ? "active" : ""} onClick={() => setMenu("home")}>home</Link>
            <a href="#explore-menu" className={menu==="menu" ? "active":""}onClick={() => setMenu("menu")}>About Us</a>
            <a href="#app-download" className={menu==="mobile-app" ? "active" : ''}onClick={() => setMenu("mobile-app")}>mobile-app</a>
            <a href="#footer" className={menu==="contact-us"? "active" : ''}onClick={() => setMenu("contact-us")}>contact us</a>
        </ul>
        <div className='navbar-right'>
            <img src={assets.search_icon} alt='search' className='navbar-search-icon'/>
            <div className='navbar-search-icon'>
                <Link to='/cart'>
                <img src={assets.basket_icon} alt='cart'/>
                </Link>
                <div className={getTotalCartAmount() === 0 ? "":"dot"}></div>
            </div>
            <button onClick={() => setShowLogin(true)}>
                sign in
            </button>
        </div>
    </div>
  )
}

export default NavBar