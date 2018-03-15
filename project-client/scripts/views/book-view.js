'use strict';

(function(module) {

    const Book = module.Book;

    const bookView = {};

    const listTemplate = Handlebars.compile($('#book-template').html());
    const detailTemplate = Handlebars.compile($('#book-detail-template').html());

    bookView.init = () => {
        $('#booklist').show();

        $('#books').empty();
        Book.all.forEach(data => $('#books').append(listTemplate(data)));
        // $('#booklist').append(Book.all.length, ' total books');
    };

    bookView.initNew = () => {
        $('#book-new-view').show();
        
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

        $('#delete-button').on('click', () => {
            Book.delete(Book.detail.book_id)
                .then(() => {
                    page('/');
                })
                .catch(err => {
                    console.error(err);
                });
        });

        $('#update-button').on('click', () => {
            page(`/books/${Book.detail.book_id}/update`);
        });
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

    module.bookView = bookView;
    
})(window.module);