import React from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useState } from 'react'

const LoginPopup = ({setShowLogin}) => {
    const [currentState, setCurrentState] = useState('Login')
  return (
    <div className='login-popup'>
        <form action="" className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={() => {setShowLogin(false)}} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currentState === "Login" ? <></> : <input type='text' placeholder='your name' required/>}
                
                <input type='email' placeholder='your email' required/>
                <input type='password' placeholder='your password' required/>
            </div>
            <button>{currentState === "Sign Up" ? "create account" : "login"}</button>
            <div className="login-popup-condition">
                <input type='checkbox' required/>
                <p>I agree to the terms and conditions</p>
            </div>
            {currentState === "Login" ? <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>clik here</span></p> 
            : <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
            }
            
            
        </form>
    </div>
  )
}

export default LoginPopup