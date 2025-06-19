<?php
include 'config.php';

$data = json_decode(file_get_contents("php://input"));

$title = $data->title;
$author = $data->author;
$price = $data->price;
$category = $data->category;
$image = $data->image;

$sql = "INSERT INTO books (title, author, price, category, image) VALUES ('$title', '$author', '$price', '$category', '$image')";

if ($conn->query($sql)) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false]);
}
?>
