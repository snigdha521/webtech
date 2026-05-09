$(document).ready(function () {

    loadBooks();

    $('#bookForm').submit(function (e) {

        e.preventDefault();

        let id = $('#book_id').val();

        let action = 'add';

        if (id != '') {
            action = 'update';
        }

        $.ajax({
            url: 'ajax/bookHandler.php',
            type: 'POST',
            data: {
                action: action,
                id: id,
                title: $('#title').val(),
                author: $('#author').val(),
                category: $('#category').val(),
                status: $('#status').val()
            },
            success: function (response) {

                alert(response);

                $('#bookForm')[0].reset();
                $('#book_id').val('');
                $('#saveBtn').text('Add Book');

                loadBooks();
            }
        });
    });
});

function loadBooks() {

    $.ajax({
         url: 'ajax/bookHandler.php',
        type: 'POST',
        data: { action: 'fetch' },
        success: function (data) {
            $('#bookData').html(data);
        }
    });
}

function editBook(id) {

    $.ajax({
        url: 'ajax/bookHandler.php',
        type: 'POST',
        data: {
            action: 'edit',
            id: id
        },
        success: function (response) {

            let data = JSON.parse(response);

            $('#book_id').val(data.id);
             $('#title').val(data.title);
            $('#author').val(data.author);
            $('#category').val(data.category);
            $('#status').val(data.status);

            $('#saveBtn').text('Update Book');
        }
    });
}

function deleteBook(id) {

    if (confirm('Are you sure to delete this book?')) {

        $.ajax({
            url: 'ajax/bookHandler.php',
            type: 'POST',
            data: {
                action: 'delete',
                id: id
            },
            success: function (response) {
                alert(response);

                loadBooks();
            }
        });
    }
}