'use strict';

(function(module) {

    $('.icon-hamburger').on('click', () => {
        $('nav').slideToggle(350);
    });

    const Book = module.Book;
    const bookView = module.bookView;

    page('/home', () => Book.fetchAll(bookView.init));
    page('/books/new', () => bookView.initNew());
    page('/books/:id/update', ctx => Book.fetchOne(ctx.params.id).then(bookView.initUpdate));
    page('/books/:id', ctx => Book.fetchOne(ctx.params.id, bookView.initDetail));
    page('*', () => page.redirect('/home'));

    page({ hashbang:true });

})(window.module);