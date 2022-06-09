import React from "react";
import { NavLink } from "react-router-dom";
import "./nav.css"


const NavPrivate = () => {  
  return (
    <div className='navDiv'>
        <div className='navLogoDiv'>
            <h1>LOGO</h1>
        </div>
        <div className='navLinkDiv'>
            <NavLink className='navLink' to="/">Products</NavLink>
            <NavLink className='navLink' to="/contact">Contact</NavLink>
            <NavLink className='navLink' to="/about">about</NavLink>
            <NavLink className='navLink' to="/profile">Profile</NavLink>
            <NavLink className='navLink' to="/cart">Cart</NavLink>
            <NavLink className='navLink' to="/wishlist">Wishlist</NavLink>
        </div>
    </div>
  );
};

export default NavPrivate;
