<?php
include 'config.php';

$data = json_decode(file_get_contents("php://input"));
$id = $data->id;

$title = $data->title;
$author = $data->author;
$price = $data->price;
$category = $data->category;
$image = $data->image;

$sql = "UPDATE books SET title='$title', author='$author', price='$price', category='$category', image='$image' WHERE id=$id";

if ($conn->query($sql)) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false]);
}
?>
