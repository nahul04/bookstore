import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import './Home.css';

// Import fearured images
import harry from '../assets/harry.jpg';
import autumn from'../assets/autumn.jpg';
import hobbit from'../assets/hobbit.jpg';
import ontheRoad from '../assets/on the Road.jfif';
import Sleppingmagic from'../assets/Slepping magic.jfif';
import TotheForest from '../assets/To the Forest.png';
import Hands from'../assets/hands.jfif';
import Which from'../assets/which.png';
import Inside from'../assets/Inside.png';

const featuredBooks = [
  {
    title: 'Harry',
    image: harry,
 
  },
 {
  title:'Autumn',
  image:autumn,
 },
 {
  title:'habbit',
  image: hobbit,
 },
 {
  title:'on the Road',
  image: ontheRoad,
 },
 {
  title:'Slepping magic ',
  image: Sleppingmagic  ,
  
 },
 {
  title:'To the Forest',
  image: TotheForest,
 },
 {
  title: 'Hands',
  image: Hands,

},
{
  title: 'Which',
  image: Which,

},
{
  title: 'Inside',
  image: Inside,

},
];





const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Online Bookstore</h1>
      <p className="home-subtitle">A World of Books at Your Fingertips.</p>
      <p  className="home-tagline">Shop the Best Reads Online - Fast, Easy & Affordable!</p>
      

      <h1 className="featured-arrivel">Explore Our Featured Arrivals</h1>
      <h2 className="featured-heading">Featured Books</h2>
      

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="book-swiper"
      >
        {featuredBooks.map((book, index) => (
          <SwiperSlide key={index}>
            <div className="book-card">
              <img src={book.image} alt={book.title} className="book-image" />
              <h4 className="book-title">{book.title}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Home;