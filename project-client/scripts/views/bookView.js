'use strict';

(function(module) {

    const Book = module.Book;

    const bookView = {};

    bookView.initIndexPage = () => {
        const template = Handlebars.compile($('#book-template').html());
        Book.all.forEach(data => $('#booklist ul').append(template(data)));
        $('#booklist').append(Book.all.length, ' total books');
    };

    module.bookView = bookView;
    
})(window.module);