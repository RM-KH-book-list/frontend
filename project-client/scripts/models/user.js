'use strict';

(function(module) {

    function User(auth) {
        this.isAdmin = auth.admin;
    }

    User.current = null;

    User.auth = passphrase => {
        return $.getJSON(`${API_URL}/admin?token=${passphrase}`)
            .then(response => {
                const user = User.current = new User(response);

                if(user.isAdmin) {
                    $.ajaxSetup({
                        headers: { token: passphrase }
                    });
                }
                return user;
            });
    };

    module.User = User;

})(window.module);