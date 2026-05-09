<?php

require_once '../controller/BookController.php';

if (isset($_POST['action'])) {

    $action = $_POST['action'];

    switch ($action) {

        case 'add':
            createBook();
            break;

        case 'fetch':
            showBooks();
            break;

        case 'edit':
            editBookData();
            break;
        case 'update':
            updateBookData();
            break;

        case 'delete':
            removeBook();
            break;
    }
}

?>