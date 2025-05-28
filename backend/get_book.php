<?php
include 'config.php';

$sql = "SELECT * FROM books";
$result = $conn->query($sql);

$books = [];

while ($row = $result->fetch_assoc()) {
  $books[] = $row;
}

echo json_encode($books);


?>
