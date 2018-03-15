'use strict';

(function (module) {

    const template = Handlebars.compile($('#book-template').html());
    
    function Book(data) {
        Object.keys(data).forEach(key => this[key] = data[key]);
    }
    
    Book.prototype.toHtml = function() {
        return template(this);
    };

    // Define "instance" data methods
    Book.insert = function(data, callback) {
        $.post(`${API_URL}/books`, data)
            .then(data => {
                Object.keys(data).forEach(key => this[key] = data[key]);
                if(callback) callback(data);
            });
    };
    
    Book.all = [];
    
    Book.fetchAll = function(callback) {
        return $.getJSON(`${API_URL}/books`)
            .then(data => {
                Book.all = data.map(each => new Book(each));
                if(callback) callback();
            })
            .catch(err => {
                console.error(err);
            });
    };

    Book.detail = null;

    Book.fetchOne = (id, callback) => {
        return $.getJSON(`${API_URL}/books/${id}`)
            .then(data => {
                Book.detail = new Book(data);
                if (callback) callback();
            })
            .catch(err => {
                console.error(err);
            });
    };

    Book.delete = id => {
        return $.ajax({
            url: `${API_URL}/books/${id}`,
            method: 'DELETE'
        });
    };

    Book.update = (data, callback) => {
        $.ajax({
            url:`${API_URL}/books/${data.book_id}`,
            method: 'PUT',
            data: data
        })
            .then (() => {
                if (callback) callback();
            });
    };

    Book.found = null;
    Book.search = '';

    Book.find = search => {
        Book.search = search;
        return $.getJSON(`${API_URL}/books?search=${encodeURIComponent(search)}`)
            .then(result => {
                Book.found = result.items;
            });
    };

    module.Book = Book;

})(window.module);