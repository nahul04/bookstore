import React from 'react';
import './Footer.css';
import Social from '../assets/Social.avif';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';


const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-sections">

        {/* Categories */}
        <div className="footer-column">
          <h4>Categories</h4>
          <ul>
            <li>Fichion</li>
            <li>Fantasy</li>
            <li>Novels</li>
            <li>Fashion</li>
            <li>Story</li>
            <li>Horror</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Category</li>
            <li>Cart</li>
            <li>Login</li>
          </ul>
        </div>

        {/* Information */}
        <div className="footer-column">
          <h4>Information</h4>
          <ul>
            <li>Shipping </li>
            <li>Privacy And Cookies Policy</li>
            <li>Terms & Conditions</li>
            <li>Payment Policy</li>
            
          </ul>
        </div>

        {/* Contact Details */}
        <div className="footer-column">
          <h4>Contact Details</h4>
          <p><MdLocationOn /> No.30, Stanley Thilakarathne Mawatha, Nugegoda, Sri Lanka</p>
          <p><MdPhone /> +94 711304050 / 011280820</p>
          <p><MdEmail /> webadmin@book.lk</p>
        </div>
      </div>
        <img src={Social} alt="Social Banner" className="social-banner" />
    </footer>
  );
};

export default Footer;
