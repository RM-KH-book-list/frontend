'use strict';

(function(module) {

    const Book = module.Book;

    const bookView = {};

    const template = Handlebars.compile($('#book-template').html());

    function resetView() {
        $('.view').hide();
    }

    bookView.init = () => {
        resetView();
        $('#booklist').show();

        $('#books').empty();
        Book.all.forEach(data => $('#books').append(template(data)));
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

                Book.insert(data);
            });
    };

    module.bookView = bookView;
    
})(window.module);