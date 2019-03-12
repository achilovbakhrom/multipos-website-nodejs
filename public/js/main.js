'use strict';
// function showHide(){
//     if($(".login-dropdown-content-custom").css("display") === "none"){
//         $(".login-dropdown-content-custom").css("display", "block")
//     } else {
//         $(".login-dropdown-content-custom").css("display", "none")
//     }
// }

(function () {
    let username = $.cookie("username");
    let urlParams = window.location.pathname.split('/');
    let lang = urlParams[urlParams.length - 1];


    if ($.cookie("username")) {
        var profileBtn = "My Profile";
        var logoutBtn = "Log Out";
        if(lang === "ru"){
            profileBtn = "Мой Профиль";
            logoutBtn = "Выйти";
        }

        $('#login_area').append("<div class='login-dropdown-custom>'" +
            // "<button onclick=\"showHide()\" class=\"login-dropbtn-custom\">Profile</button>" +
            "<button class='login-dropbtn-custom'>" + username + "</button>" +
            "<div class='login-dropdown-content-custom'>" +
            "<a href=\"/userpage/" + lang + "\">" + profileBtn + "</a>" +
            "<a id='logout' href='#'>"+logoutBtn+"</a>" +
            "</div>" +
            "</div>");


        // <div class="dropdown">
        //         <button class="dropbtn">Dropdown</button>
        //         <div class="dropdown-content">
        //         <a href="#">Link 1</a>
        //     <a href="#">Link 2</a>
        //     <a href="#">Link 3</a>
        //     </div>
        //     </div>

        // var urlParams = window.location.pathname.split('/');
        // // var localLang = urlParams[urlParams.length-1];
        // $('#login_area').append("<p><a style=\"text-decoration: underline\" class=\"login_profile_area\" onclick='location.href = /userpage/ + urlParams[urlParams.length-1]'>" + username + " </a>&nbsp&nbsp|&nbsp&nbsp <a data-language='llogout'  class=\"btn blue\" id=\"logout\" href=\"#\"> Logout </a></p>");
    } else {
        // var urlParams = window.location.pathname.split('/');
        // var username = $.cookie("username");
        $('#login_area').append("<ul style='margin-left: 5%;' class=\"navbar-right d-flex\"> <li><a href=\"/login/" + lang + "\" data-language='lsignin'> Sign In </a> </li><li><a data-language='lsignup' href=\"/register/" + lang + "\"> Sign Up </a></li></ul>");
    }

    $('#logout').click(function () {
        $.removeCookie('username', {path: '/'});
        $.removeCookie('expires', {path: '/'});
        $.removeCookie('access_token', {path: '/'});
        $.removeCookie('sessionId', {path: '/'});
        $.removeCookie('user_role', {path: '/'});
        var urlParams = window.location.pathname.split('/');
        var lang = urlParams[urlParams.length - 1];
        window.location.replace("http://localhost:3000/" + lang);
    });


    $('#login_now').click(login);

    function login() {
        let email = $('#billing_email').val();
        let password = $('#billing_password').val();
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/oauth/token",
            data: {
                "username": email,
                "password": password,
                "client_id": 'application',
                "client_secret": 'secret',
                "grant_type": "password"
            },
            statusCode: {
                404: function (error) {
                    alert("Username or password are incorrect");
                    window.location.replace("http://localhost:3000/" + lang);
                },
                401: function (error) {
                    alert("Username or password are incorrect");
                    window.location.replace("http://localhost:3000/login/" + lang);
                },
                500: function (error) {
                    alert("Username or password are incorrect");
                    window.location.replace("http://localhost:3000/login/" + lang);
                }
            },
            success: function (response) {
                var userRole = "";
                $.ajax({
                    type: "POST",
                    url: "http://localhost:3000/users/" + email,
                    statusCode: {
                        404: function (error) {
                            alert("Username or password are incorrect");
                            window.location.replace("http://localhost:3000/" + lang);
                        },
                        401: function (error) {
                            alert("Username or password are incorrect");
                            window.location.replace("http://localhost:3000/login/" + lang);
                        },
                        500: function (error) {
                            alert("Username or password are incorrect");
                            window.location.replace("http://localhost:3000/login/" + lang);
                        }
                    },
                    success: function (response2) {
                        var date = new Date(43200);
                        var expirationDateString = date.toUTCString();
                        $.cookie("username", email, {path: '/'});
                        $.cookie("user_role", response2, {path: '/'});
                        $.cookie("access_token", response.access_token, {path: '/'});
                        $.cookie("expires", expirationDateString, {path: '/'});
                        window.location.replace("http://localhost:3000/" + lang);

                    }
                });
            },
            dataType: 'json'
        });
    }

    var sending = false;

    $('#register_now').click(function () {
        if (sending) return;
        var firstNameValue = $('#billing_first_name').val();
        var lastNameValue = $('#billing_last_name').val();
        var emailValue = $('#billing_email').val();
        var passwordValue = $('#billing_password').val();
        var passwordConfirm = $('#confirm_password').val();

        if (passwordConfirm == null || passwordConfirm !== passwordValue) {
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
            url: "/register/save/en",
            data: {
                "first_name": firstNameValue,
                "last_name": lastNameValue,
                "email": emailValue,
                "password": passwordValue,
                "comfirm": passwordConfirm
            },
            statusCode: {
                500: function (error) {
                    // alert("Email with confirmation code has been sent to email address indicated! \n Please check your email and activate profile to proceed!");
                    window.location.replace("http://localhost:3000/confirmation/" + lang);
                },
                409: function () {
                    alert("Such email is already exists");
                    window.location.replace("http://localhost:3000/register/" + lang);
                }
            },
            success: function (response) {
                // login();
                // alert("Email with confirmation code has been sent to email address indicated! \n Please check your email and activate profile to proceed!");
                response.redirect("/confirmation/" + lang)
                // var date = new Date(43200);
                // var expirationDateString = date.toUTCString();
                // var sessionId = response.sessionId;
                // var email = emailValue;
                // $.cookie("username", email, {path: '/'});
                // $.cookie("sessionId", sessionId, {path: '/'});
                // $.cookie("expires", expirationDateString, {path: '/'});
                // window.location.replace("http://localhost:3000/" + lang);
            },
            dataType: 'json'
        });
    });
}());