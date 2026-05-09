<?php
header("Content-Type: application/json");

$data = [
    "name" => "Asif",
    "age" => 22,
    "city" => "Dhaka"
];

echo json_encode($data);
?>