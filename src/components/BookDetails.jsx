import React from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();

  // Dummy data for example – ideally you'd fetch from state or API
  const book = {
    id,
    title: "Sample Book",
    author: "John Doe",
    category: "Fiction",
    description: "A great book.",
    price: 19.99,
  };

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Category:</strong> {book.category}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Price:</strong> ${book.price}</p>
    </div>
  );
};

export default BookDetails;
