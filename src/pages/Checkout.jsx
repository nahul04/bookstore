import React from "react";

const Checkout = () => {
  const handlePayment = () => {
    const payment = {
      sandbox: true, // true for sandbox mode
      merchant_id: "YOUR_MERCHANT_ID", // Replace with your PayHere Merchant ID
      return_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-cancel",
      notify_url: "http://localhost:5000/notify", // your backend endpoint
      order_id: "ORDER123456", // Unique order ID
      items: "Books Purchase",
      amount: "2500.00",
      currency: "LKR",
      first_name: "Ramya",
      last_name: "Nagulendiran",
      email: "ramya@example.com",
      phone: "0771234567",
      address: "No.1, Kandy Road",
      city: "Colombo",
      country: "Sri Lanka",
    };

    window.payhere.startPayment(payment);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handlePayment}>Pay with PayHere</button>
    </div>
  );
};

export default Checkout;
