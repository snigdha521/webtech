<?php

require_once '../config/db.php';

function addBook($title, $author, $category, $status)
{
    global $conn;

    $query = "INSERT INTO books(title, author, category, status)
              VALUES('$title', '$author', '$category', '$status')";

    return mysqli_query($conn, $query);
}

function getBooks()
{
    global $conn;

    $query = "SELECT * FROM books ORDER BY id DESC";

    return mysqli_query($conn, $query);
}
function getBookById($id)
{
    global $conn;

    $query = "SELECT * FROM books WHERE id = $id";

    $result = mysqli_query($conn, $query);

    return mysqli_fetch_assoc($result);
}

function updateBook($id, $title, $author, $category, $status)
{
    global $conn;

    $query = "UPDATE books
              SET title='$title',
                  author='$author',
                  category='$category',
                  status='$status'
              WHERE id=$id";

    return mysqli_query($conn, $query);
    }

function deleteBook($id)
{
    global $conn;

    $query = "DELETE FROM books WHERE id=$id";

    return mysqli_query($conn, $query);
}

?>