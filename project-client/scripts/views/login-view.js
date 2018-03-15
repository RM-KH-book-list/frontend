'use strict';

(function(module) {

    const User = module.User;

    const loginView = {};

    loginView.init = () => {
        if(User.isAdmin) {
            $('#admin-form').hide();
            $('#logged-in').show();
        }
        else {
            $('#admin-form').off('submit', handleSubmit);
            $('#logged-in').hide();
        }
        $('#admin-view').show();
    };

    const handleSubmit = event => {
        event.preventDefault();

        User.auth($('#passphrase').val())
            .then(user => {
                if(!user.isAdmin) alert('that\'s not the passphrase');
                else {
                    $('#admin-form')[0].reset();
                    page('/');
                }
            });
    };

    module.loginView = loginView;

})(window.module);