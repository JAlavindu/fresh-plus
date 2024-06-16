import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'

const Header = () => {
  return (
    <div className='header'>
      {/* <div className="header-image">
          <img src={assets.header_img} alt=""/>
        </div> */}
        <div className="header-contents">
            <h2>Fresh vegetables for you.</h2>
            <p>choose from menu</p>
            <button>View Menu</button>
        </div>
        
    </div>
  )
}

export default Header