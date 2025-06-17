import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import background from '../assets/bg-books.jpg';
import Footer from '../components/Footer';
import './Home.css';

import harry from '../assets/harry.jpg';
import autumn from '../assets/autumn.jpg';
import hobbit from '../assets/hobbit.jpg';
import hands from '../assets/hands.jfif';
import which from '../assets/which.png';
import inside from '../assets/Inside.png';
import gilded from '../assets/gilded.jpeg';
import Moon from '../assets/Moon.jfif';
import Charming from "../assets/charming.png";
import How from"../assets/How.webp";

const featuredBooks = [
  { title: 'Harry Potter', image: harry },
  { title: 'Autumn Leaves', image: autumn },
  { title: 'The Hobbit', image: hobbit },
  { title: 'Helping Hands', image: hands },
  { title: 'Which', image: which },
  { title: 'Inside the Mind', image: inside },
  { title: 'Gilded', image: gilded },
  { title: 'Moon', image: Moon },
  { title: 'Charming', image: Charming },
  { title: 'How', image: How }
];

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/books')
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error('Error fetching books:', error));
  }, []);

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.95)), url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        paddingBottom: '3rem'
      }}
    >
      <header className="home-header">
        <h1 className="home-title">
          Welcome to the <span className="highlight">Online</span> Bookstore
        </h1>
        <p className="home-subtitle">A WORLD OF BOOKS AT YOUR FINGERTIPS</p>
        <p className="home-tagline">
          Shop the Best Reads Online – <em>Fast, Easy & Affordable!</em>
        </p>
      </header>

      <section className="featured-section">
        <p className="featured-arrival">Explore Our Featured Arrivals</p>
        <h2 className="featured-heading">Featured Books</h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="book-swiper"
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {featuredBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <div className="book-card-modern">
                <img
                  src={book.image}
                  alt={`${book.title} cover`}
                  className="book-image-modern"
                />
                <div className="book-info-modern">
                  <h4>{book.title}</h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
