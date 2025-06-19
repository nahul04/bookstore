<?php
include 'config.php';

$bookId = $_GET['id'];
$sql = "SELECT title, sample_chapter FROM books WHERE id = $bookId";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
}
$conn->close();
?>