'use strict';

(function(module) {

    const Book = module.Book;

    const bookView = {};

    const listTemplate = Handlebars.compile($('#book-template').html());
    const detailTemplate = Handlebars.compile($('#book-detail-template').html());

    function resetView() {
        $('.view').hide();
        $('nav').slideUp(350);
    }

    bookView.init = () => {
        resetView();
        $('#booklist').show();

        $('#books').empty();
        Book.all.forEach(data => $('#books').append(listTemplate(data)));
        // $('#booklist').append(Book.all.length, ' total books');
    };

    bookView.initNew = () => {
        resetView();
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
        resetView();

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
        console.log('this would be the update page!');
    };

    module.bookView = bookView;
    
})(window.module);