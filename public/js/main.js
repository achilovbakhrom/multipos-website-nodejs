'use strict';

(function() {

    if ($.cookie("username")) {
        var username = $.cookie("username");
        $('#login_area').append("<p><a>" + username + " </a>&nbsp&nbsp|&nbsp&nbsp <a class=\"btn blue\" id=\"logout\" href=\"#\"> Logout </a></p>");
    } else {
        $('#login_area').append("<ul style='margin-left: 25%;' class=\"navbar-right d-flex\"> <li><a href=\"/login\"> Sign In </a> </li><li><a href=\"/register\"> Sign Up </a></li></ul>");
    }

    $('#logout').click(function () {
        $.removeCookie('username', { path: '/' });
        $.removeCookie('expires', { path: '/' });
        $.removeCookie('access_token', {path: '/'});
        $.removeCookie('sessionId', {path:'/'});
        window.location.replace("http://localhost:3000");
    });


    $('#login_now').click(function () {
        let email = $('#email_now').val();
        let password = $('#password_now').val();
        $.ajax({
            type: "POST",
            url:"http://localhost:3000/oauth/token",
            data: {
                "username": email,
                "password": password,
                "client_id": 'application',
                "client_secret": 'secret',
                "grant_type": "password"
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
                console.log(response);
                var date = new Date(43200);
                var expirationDateString = date.toUTCString();
                $.cookie("username", email);
                $.cookie("access_token", response.access_token);
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
        var companyNameValue = $('#billing_company_name').val();
        var emailValue = $('#billing_email').val();
        var passwordValue = $('#billing_password').val();
        var passwordConfirm = $('#confirm_password').val();

        if(passwordConfirm == null || passwordConfirm !== passwordValue){
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
        if (companyNameValue === null || companyNameValue.length < 3) {
            alert("Company name must contain at least 3 letters");
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
                "company_name": companyNameValue,
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