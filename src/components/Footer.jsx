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
            <li>School List</li>
            <li>Children</li>
            <li>Galle Literary</li>
            <li>Gift Packs</li>
            <li>By Language</li>
            <li>Promotions</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
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
