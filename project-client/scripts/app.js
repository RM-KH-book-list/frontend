'use strict';

(function(module) {

    $('.icon-hamburger').on('click', () => {
        $('nav').slideToggle(350);
    });

    function resetView() {
        $('.view').hide();
        $('nav').slideUp(350);
    }

    const Book = module.Book;
    const bookView = module.bookView;
    const loginView = module.loginView;

    page('*', (ctx, next) => {
        resetView();
        next();
    });

    page('/', () => Book.fetchAll().then(bookView.init));
    page('/login', loginView.init);
    page('/books/new', () => bookView.initNew());
    page('/books/:id/update', ctx => Book.fetchOne(ctx.params.id).then(bookView.initUpdate));
    page('/books/:id', ctx => Book.fetchOne(ctx.params.id, bookView.initDetail));
    page('*', () => page.redirect('/'));

    page({ hashbang:true });

})(window.module);