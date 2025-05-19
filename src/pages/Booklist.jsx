import React from 'react';
import BookCard from '../components/BookCard';
import TheHobbit from '../assets/The Hobbit.jpg'; 
import Orange from '../assets/Orange.png';
import Sword from '../assets/Sword.jfif'; 
import Lord from '../assets/Lord.jfif';
import Sons from '../assets/Sons.webp';
import Charming from '../assets/charming.png';
import Mortals from '../assets/Mortals.jfif';
import Moon from '../assets/Moon.jfif';
import Womb from '../assets/Womb.webp';
import Gilded from '../assets/Gilded.jpeg';
import Home from '../assets/home.jfif';
import Fire from '../assets/fire.webp';
import Stand from '../assets/stand.png';
import Death from '../assets/death.jpg';
import The from '../assets/The.jfif';
import Secret from '../assets/secret.jfif';

//fetch data 

const categories = [
  {
    name: 'Fantasy',
    books: [
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        image: TheHobbit,
        price: 500,
      },
      {
        title: 'The Priory of the Orange Tree',
        author: 'Samantha Shannon',
        image: Orange,
        price: 800,
      },
      {
        title: 'The Sword',
        author: 'Olivia Wilson',
        image: Sword,
        price: 400,
      },
      {
        title: 'To Bargain with Mortals',
        author: 'R.A. Basu',
        image: Mortals,
        price: 1000,
      },
      {
        title: 'The Lord of the Kings',
        author: 'Sarah Geston',
        image: Lord,
        price: 900,
      },
      {
        title: 'A Charming Tale',
        author: 'Kara Dempsey',
        image: Charming,
        price: 1000,
      },
      {
        title: 'Sons of the Oak',
        author: 'Runelords',
        image: Sons,
        price: 800,
      },
      {
        title: 'Marked by the Moon',
        author: 'Helen Scott',
        image: Moon,
        price: 700,
      },
    ],
  },
  {
    name: 'Novels',
    books: [
      {
        title: 'Home to Harlem',
        author: 'Claude McKay',
        image: Home,
        price: 1200,
      },
      {
        title: 'The Gilded Ones',
        author: 'Namina Forna',
        image: Gilded,
        price: 800,
      },
      {
        title: 'Womb City',
        author: 'Tlotlo Tsamaase',
        image: Womb,
        price: 1000,
      },
      {
        title: 'Wings of Fire',
        author: 'Escaping Peril',
        image: Fire,
        price: 950,
      },
      {
        title: 'The Stand',
        author: 'Stephen King',
        image: Stand,
        price: 1200,
      },
      {
        title: 'Death in Her Hands',
        author: 'Ottessa Moshfegh',
        image: Death,
        price: 1200,
      },
    ],
  },
  {
    name: 'Self-Help',
    books: [
      {
        title: 'How to Build Your Self Esteem',
        author: 'Maya Jones',
        image: Home,
        price: 1500,
      },
      {
        title: 'The Field of Freedom',
        author: 'Jamie Chandler',
        image: The,
        price: 1800,
      },
      {
        title: 'The Secret of Leadership',
        author: 'Prakash Iyer',
        image: Secret,
        price: 1400,
      },
    ],
  },
]
const BookList = () => {
  const getCategoryStyle = (categoryName) => {
    const styles = {
      Fantasy: {
        bgColor: '#e6f7ff',
        textColor: '#075985',
        borderColor: '#bae6fd'
      },
      Novels: {
        bgColor: '#f5eeff',
        textColor: '#4b0082',
        borderColor: '#d9c7ff'
      },
      'Self-Help': {
        bgColor: '#f0fff4',
        textColor: '#065f46',
        borderColor: '#a7f3d0'
      },  
    };
    
    return styles[categoryName] || {
      bgColor: '#f5f5f5',
      textColor: '#333',
      borderColor: '#ddd'
    };
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.mainTitle}>Categories</h2>

      {categories.map((category, catIndex) => {
        const categoryStyle = getCategoryStyle(category.name);
        return (
          <div 
            key={catIndex} 
            style={{
              ...styles.categorySection,
              backgroundColor: categoryStyle.bgColor,
              padding: '1.5rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              border: `1px solid ${categoryStyle.borderColor}`
            }}
          >
            <h3 style={{
              ...styles.categoryTitle,
              color: categoryStyle.textColor,
              borderLeft: `4px solid ${categoryStyle.textColor}`
            }}>
              {category.name}
            </h3>
            <div style={styles.grid}>
              {category.books.map((book, bookIndex) => (
                <BookCard
                  key={bookIndex}
                  title={book.title}
                  author={book.author}
                  image={book.image}
                  price={book.price}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1.5rem',
    padding: '0 1rem',
  },
  mainTitle: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#333',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  categorySection: {
    marginBottom: '3rem',
  },
  categoryTitle: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    textAlign: 'left',
    paddingLeft: '1rem',
    fontWeight: '500',
  },
};

export default BookList;
