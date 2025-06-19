<?php
// Include your database configuration file
include 'config.php';

// Set JSON response header
header('Content-Type: application/json');

// SQL query to fetch orders with user and book info
$sql = "
  SELECT 
    orders.id AS order_id,
    users.name AS customer_name,
    books.title AS book_title,
    orders.quantity,
    orders.total_price,
    orders.order_date,
    orders.status
  FROM orders
  JOIN users ON orders.user_id = users.id
  JOIN books ON orders.book_id = books.id
  ORDER BY orders.order_date DESC
";

// Execute the query
$result = mysqli_query($conn, $sql);

// Check for SQL errors
if (!$result) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => mysqli_error($conn)]);
    exit;
}

// Fetch all rows into an array
$orders = [];

while ($row = mysqli_fetch_assoc($result)) {
    $orders[] = $row;
}

// Output the orders as JSON
echo json_encode($orders);
?>
