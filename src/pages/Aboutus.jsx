

import React from 'react';
import './AboutUs.css';


const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>SR Bookshop</h1>
        <p>Your trusted partner in knowledge and imagination.</p>
      </div>

      <div className="about-section">
        <h2>Who We Are</h2>
        <p>
          SR Bookshop is a premier online destination for book lovers. Founded in 2025, we aim to bring the best reading experience to everyone — from students to professionals, children to adults.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          To make knowledge and stories accessible to all corners of the world by offering a wide variety of books across genres with reliable delivery and excellent customer service.
        </p>
      </div>

      <div className="about-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li> Thousands of books from local and international authors</li>
          <li> Safe and fast delivery</li>
          <li> customer support</li>
          <li> Secure payment methods</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
