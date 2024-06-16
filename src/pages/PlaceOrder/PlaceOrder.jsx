import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {
    const{getTotalCartAmount} = useContext(StoreContext)
  return (
    <form className='place-order'>
        <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
                <input type="text" placeholder="First Name"/>
                <input type="text" placeholder="Last name"/>
            </div>
            <input type="email" placeholder="email address"/>
            <input type="text" placeholder="street"/>
            <div className="multi-fields">
                <input type="text" placeholder="City"/>
                <input type="text" placeholder="State"/>
            </div>
            <div className="multi-fields">
                <input type="text" placeholder="Zip code"/>
                <input type="text" placeholder="Country"/>
            </div>
            <input type="text" placeholder='phone'/>
        </div>
        <div className="place-order-right">
        <div className="cart-total">
                <h2>Cart Totals</h2>
                <div>
                    <div className="cart-total-details">
                        <p>SubTotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr/>
                    <div className="cart-total-details">
                        <p>Delivery Fee</p>
                        <p>${2}</p>
                    </div>
                    <hr/>
                    <div className="cart-total-details">
                        <b>Total</b>
                        <b>${getTotalCartAmount()+2}</b>
                    </div>
                    <hr/>
                </div>
                <button >PROCEED TO PAYMENT</button>
            </div>
        </div>
    </form>
    
  )
}

export default PlaceOrder