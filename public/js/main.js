'use strict';

(function() {

    $('#login_now').click(function () {
        let email = $('#email_now').val();
        let password = $('#password_now').val();
        $.ajax({
            type: "POST",
            url:"login/authorize",
            data: {
                "email": email,
                "password": password
            },
            statusCode:{
                404: function (error) {
                    alert(error.message);
                    window.location.replace("http://localhost:3000");
                },
                401: function (error) {
                    alert(error.message);
                    window.location.replace("http://localhost:3000/login");
                },
                500: function (error) {
                    alert(error.message);
                    window.location.replace("http://localhost:3000/login");
                }
            },
            success: function (response) {
                var date = new Date(43200);
                var expirationDateString = date.toUTCString();
                var sessionId = response.sessionId;
                $.cookie("username", email);
                $.cookie("sessionId", sessionId);
                $.cookie("expires", expirationDateString);
                window.location.replace("http://localhost:3000");
            },
            dataType:'json'
        });
    });

    var sending = false;

    $('#register_now').click(function() {
        if (sending) return;
        var firstNameValue = $('#billing_first_name').val();
        var lastNameValue = $('#billing_last_name').val();
        var emailValue = $('#billing_email').val();
        var passwordValue = $('#billing_password').val();
        var passwordConfirm = $('#confirm_password').val();

        if(passwordConfirm == null || passwordConfirm != passwordValue){
            alert("Please replay password");
            return;
        }
        if (firstNameValue === null || firstNameValue.length < 3) {
            alert("First name must contain at least 3 letters");
            return;
        }

        if (lastNameValue === null || lastNameValue.length < 3) {
            alert("Last name must contain at least 3 letters");
            return;
        }

        function ValidateEmail(mail) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
                return (true)
            }
            return (false)
        }

        if (emailValue === null || !ValidateEmail(emailValue)) {
            alert("Wrong email address");
            return;
        }

        if (passwordValue === null || passwordValue.length < 8) {
            alert("Password must contain at least 8 characters");
            return;
        }
        //end validation
        sending = true;
        $.ajax({
            type: "POST",
            url: "register/save",
            data: {
                "first_name": firstNameValue,
                "last_name": lastNameValue,
                "email": emailValue,
                "password": passwordValue,
                "comfirm": passwordConfirm
            },
            statusCode: {
                500: function(error) {
                    alert(error.message);
                    window.location.replace("http://localhost:3000");
                },
                409: function () {
                    alert("Such email is already exists");
                    window.location.replace("http://localhost:3000/register");
                }
            },
                success: function (response) {
                var date = new Date(43200);
                var expirationDateString = date.toUTCString();
                var sessionId = response.sessionId;
                var email = emailValue;
                $.cookie("username", email);
                $.cookie("sessionId", sessionId);
                $.cookie("expires", expirationDateString);
                window.location.replace("http://localhost:3000");
            },
            dataType: 'json'
        });
    });
}());