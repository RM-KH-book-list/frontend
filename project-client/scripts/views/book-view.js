'use strict';

(function(module) {

    const Book = module.Book;
    const User = module.User;

    const bookView = {};

    const listTemplate = Handlebars.compile($('#book-template').html());
    const detailTemplate = Handlebars.compile($('#book-detail-template').html());

    bookView.init = () => {
        $('#booklist').show();

        $('#books').empty();
        Book.all.forEach(data => $('#books').append(listTemplate(data)));
        $('.icon-plus').hide();

        $('.book-listing')
            .off('click')
            .hover(
                function(){ $(this).addClass('hover'); },
                function(){ $(this).removeClass('hover'); }
            )
            .on('click', function() {
                const id = $(this).data('id');
                page(`/books/${id}`);
            });
    };

    bookView.initNew = () => {
        $('#book-new-view').show();

        $('#book-new-view button').text('submit');
        $('#book-new-view h2').text('add a new book');
        
        $('#add-book')
            .off('submit')
            .on('submit', event => {
                event.preventDefault();

                const data = {
                    title: $('input[name=title]').val(),
                    author: $('input[name=author]').val(),
                    isbn: $('input[name=isbn]').val(),
                    image_url: $('input[name=img-url]').val(),
                    description: $('textarea[name=description]').val()
                };

                Book.insert(data, (newdata) => {
                    $('#add-book')[0].reset();
                    page(`/books/${newdata.book_id}`);
                });
                    
            });
    };

    bookView.initDetail = () => {

        const html = detailTemplate(Book.detail);

        $('#book-details')
            .empty()
            .append(html);
        $('#book-detail-view').show();

        if (User.current && User.current.isAdmin || sessionStorage.getItem('isAdmin')) {
            $('#admin-actions').show();
            $('#delete-button')
                .off('click')
                .on('click', () => {
                    Book.delete(Book.detail.book_id)
                        .then(() => {
                            page('/');
                        })
                        .catch(err => {
                            console.error(err);
                        });
                });
            $('#update-button')
                .off('click')
                .on('click', () => {
                    page(`/books/${Book.detail.book_id}/update`);
                });
        } else {
            $('#admin-actions').hide();
        }
    };

    bookView.initUpdate = () => {

        $('#book-new-view').show();

        const book = Book.detail;

        $('#book-new-view button').text('Update');
        $('#book-new-view h2').text('Update Book Info');

        $('input[name=title]').val(book.title);
        $('input[name=author]').val(book.author);
        $('input[name=isbn]').val(book.isbn);
        $('input[name=img-url]').val(book.image_url);
        $('textarea[name=description]').val(book.description);

        $('#add-book')
            .off('submit')
            .on('submit', event => {
                event.preventDefault();

                const data = {
                    title: $('input[name=title]').val(),
                    author: $('input[name=author]').val(),
                    isbn: $('input[name=isbn]').val(),
                    image_url: $('input[name=img-url]').val(),
                    description: $('textarea[name=description]').val(),
                    book_id: book.book_id
                };

                Book.update(data, () => {
                    $('#add-book')[0].reset();
                    page(`/books/${book.book_id}`);
                });
                    
            });
        
    };

    bookView.initSearch = () => {
        $('.icon-plus').show();
        $('#search-view')
            .show()
            .off('submit')
            .on('submit', handleSearch);
    };
    
    const handleAdd = function() {
        const isbn = $(this).data('isbn');
        Book.import(isbn, book => page(`/books/${book.book_id}`));
    };

    const handleSearch = e => {
        e.preventDefault();

        $('#search-results').empty();
        $('#search-error').hide();
        
        const authorValue = $('#author-input').val();
        const titleValue = $('#title-input').val();
        const isbnValue = $('#isbn-input').val();
    
        const submissions = [];

        if (authorValue) submissions.push(`inauthor:${authorValue}`);
        if (titleValue) submissions.push(`intitle:${titleValue}`);
        if (isbnValue) submissions.push(`isbn:${isbnValue}`);

        if (submissions.length === 0) {
            alert('please enter at least one search term');
        } else {
            const search = submissions.join('+');
            Book.find(search)
                .then(() => {
                    $('#search-results').append(Book.found.map(listTemplate));
                    $('.icon-plus').show();
                    $('.book-listing')
                        .off('click')
                        .removeClass('pointer')
                        .on('click', '.icon-plus', handleAdd);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    };

    module.bookView = bookView;
    
})(window.module);