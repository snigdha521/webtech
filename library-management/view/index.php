<!DOCTYPE html>
<html>
<head>
    <title>Library Management System</title>

    <link rel="stylesheet" href="assets/css/style.css">

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>
<body>

<div class="container">

    <h1>Library Management System</h1>

    <form id="bookForm">

        <input type="hidden" id="book_id">

        <input type="text" id="title" placeholder="Book Title" required>

        <input type="text" id="author" placeholder="Author Name" required>
 <input type="text" id="category" placeholder="Category" required>

        <select id="status">
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
        </select>

        <button type="submit" id="saveBtn">Add Book</button>

    </form>

    <br>

    <table>

        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody id="bookData">

        </tbody>

    </table>

</div>

<script src="assets/js/app.js"></script>

</body>
</html>