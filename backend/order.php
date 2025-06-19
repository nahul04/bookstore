<?php
include 'config.php'; // DB connection

header('Content-Type: application/json');

$sql = "
  SELECT 
    orders.id AS order_id,
    users.name AS customer_name,
    books.title AS book_title,
    orders.quantity,
    orders.total_price
  FROM orders
  JOIN users ON orders.user_id = users.id
  JOIN books ON orders.book_id = books.id
  ORDER BY orders.id DESC
";

$result = mysqli_query($conn, $sql);

if ($result) {
    $orders = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $orders[] = $row;
    }
    echo json_encode($orders);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch orders']);
}
?>