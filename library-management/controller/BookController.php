<?php

require_once '../model/BookModel.php';

function createBook()
{
    $title = $_POST['title'];
    $author = $_POST['author'];
    $category = $_POST['category'];
    $status = $_POST['status'];

    if (addBook($title, $author, $category, $status)) {
        echo "Book Added Successfully";
    } else {
        echo "Failed to Add Book";
    }
}

function showBooks()
{
    $books = getBooks();

    while ($row = mysqli_fetch_assoc($books)) {
        echo "
        <tr>
            <td>{$row['id']}</td>
            <td>{$row['title']}</td>
            <td>{$row['author']}</td>
            <td>{$row['category']}</td>
            <td>{$row['status']}</td>
            <td>
                <button onclick='editBook({$row['id']})'>Edit</button>
                <button onclick='deleteBook({$row['id']})'>Delete</button>
            </td>
        </tr>
        ";
    }
}

function editBookData()
{
    $id = $_POST['id'];

    $book = getBookById($id);

    echo json_encode($book);
}
function updateBookData()
{
    $id = $_POST['id'];
    $title = $_POST['title'];
    $author = $_POST['author'];
    $category = $_POST['category'];
    $status = $_POST['status'];

    if (updateBook($id, $title, $author, $category, $status)) {
        echo "Book Updated Successfully";
    } else {
        echo "Update Failed";
    }
}

function removeBook()
{
    $id = $_POST['id'];

    if (deleteBook($id)) {
        echo "Book Deleted Successfully";
    } else {
        echo "Delete Failed";
         }
}

?>