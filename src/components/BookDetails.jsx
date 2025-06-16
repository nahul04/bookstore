
import React from 'react';
import { useParams } from 'react-router-dom';
import './BookDetails.css';

const booksData = [
  {
    id: 1,
    title: 'The Secret Garden',
    author: 'Frances Hodgson Burnett',
    price: 1050.00,
    description: 'A classic novel about a hidden garden and healing.',
    image: '/images/the-secret-garden.jpg',
  },
  {
    id: 2,
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    price: 25.00,
    description: 'A fantasy series about a young wizard.',
    image: '/images/harry.jpg',
  },
  {
    id: 3,
    title: 'The Beautiful Fall',
    author: 'J.K. Rowling',
    price: 25.00,
    description: 'A fantasy series about a young wizard.',
    image: '/images/story.jpg',
  },

  {
    id: 4,
    title: 'The Secret Garden',
    author: 'Frances Hodgson Burnett',
    price: 1050.00,
    description: 'A classic novel about a hidden garden and healing.',
    image: '/images/Wind.jpg',
  },
  {
    id: 5,
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    price: 25.00,
    description: 'A fantasy series about a young wizard.',
    image: '/images/harry.jpg',
  },
  {
    id: 6,
    title: 'The Beautiful Fall',
    author: 'J.K. Rowling',
    price: 25.00,
    description: 'A fantasy series about a young wizard.',
    image: '/images/harry-potter.jpg',
  },
  {
    id: 7,
    title: 'Ponniyin Selvan',
    author: 'Kalki Krishnamurthy',
    price: 899.00,
    description: 'A historical novel set in the Chola dynasty era.',
    image: '/images/ponniyin-selvan.jpg',
  },
  {
    id: 8,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: 499.00,
    description: 'A philosophical story about a shepherd’s journey to find treasure.',
    image: '/images/alchemist.jpg',
  },
  {
    id: 9,
    title: 'Wings of Fire',
    author: 'A.P.J. Abdul Kalam',
    price: 375.00,
    description: 'An autobiography of Dr. A.P.J. Abdul Kalam.',
    image: '/images/wings-of-fire.jpg',
  },
  {
    id: 10,
    title: 'Goosebumps: Night of the Living Dummy',
    author: 'R.L. Stine',
    price: 350.00,
    description: 'A horror book from the popular Goosebumps series.',
    image: '/images/goosebumps.jpg',
  },
  {
    id: 11,
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    price: 550.00,
    description: 'A book on financial education and investment strategies.',
    image: '/images/rich-dad-poor-dad.jpg',
  },
  {
    id: 12,
    title: 'Think and Grow Rich',
    author: 'Napoleon Hill',
    price: 480.00,
    description: 'A motivational book focused on success and mindset.',
    image: '/images/think-grow-rich.jpg',
  },
  {
    id: 13,
    title: 'Atomic Habits',
    author: 'James Clear',
    price: 699.00,
    description: 'A guide to building good habits and breaking bad ones.',
    image: '/images/atomic-habits.jpg',
  },
    {
    id: 14,
    title: 'The Stand',
    author: 'Stephen King',
    price: 899.00,
    description: 'A post-apocalyptic horror/fantasy novel about survival and good vs evil.',
    image: '/images/stand.png',
  },
  {
    id: 15,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    price: 650.00,
    description: 'A fantasy adventure that precedes the Lord of the Rings.',
    image: '/images/The Hobbit.jpg',
  },
  {
    id: 16,
    title: 'Sleeping Magic',
    author: 'Elena Moon',
    price: 420.00,
    description: 'A dreamy fairy tale about spells, courage, and self-discovery.',
    image: '/images/Slepping magic.jiff',
  },
  {
    id: 17,
    title: 'Sword of Destiny',
    author: 'Andrzej Sapkowski',
    price: 780.00,
    description: 'A Witcher story full of monsters, magic, and fate.',
    image: '/images/sword.jiff',
  },
  {
    id: 18,
    title: 'To the Forest',
    author: 'Ariana Vale',
    price: 499.00,
    description: 'An environmental story exploring a journey into nature’s secrets.',
    image: '/images/To the Forest.png',
  },
  {
    id: 19,
    title: 'The Orange Tree',
    author: 'Mary Hollingsworth',
    price: 399.00,
    description: 'A beautifully written short story about memories and magic.',
    image: '/images/Orange.png',
  },
  {
    id: 20,
    title: 'Wind and Storm',
    author: 'Lia Tempest',
    price: 560.00,
    description: 'An epic tale of kingdoms torn by nature’s wrath and power.',
    image: '/images/wind.jpg',
  },

];


const BookDetails = () => {
  const { id } = useParams();
  const book = booksData.find((b) => b.id === parseInt(id));

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <div className="book-details">
      <img src={book.image} alt={book.title} />
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Price:</strong> Rs. {book.price}</p>
      <p><strong>Description:</strong> {book.description}</p>
    </div>
  );
};

export default BookDetails;
