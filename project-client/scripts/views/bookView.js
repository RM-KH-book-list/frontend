'use strict';

(function(module) {

    const Book = module.Book;

    const bookView = {};

    bookView.initIndexPage = () => {
        console.log(Book.fetchAll());
    };

    module.bookView = bookView;
    
})(window.app || (window.app = {}));