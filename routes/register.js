var express = require('express');
var router = express.Router();

var Users = require('../modal/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register', {});
});

router.post("/save", function (req, response, err) {
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var emailAdress = req.body.email;
    var userPassword = req.body.password;

    Users.findByEmail(emailAdress, function(err, res) {

        if (err) {
            var err = new Error();
            err.status = 500;
            console.log("error");
            err.message = "DB read is failed";
            next(err);
            return;
        }
        console.log("error2");

        if (res.length === 0) {
            var guid = function() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            };
            var sessionId = guid();
            Users.create({
                firstName: firstName,
                lastName: lastName,
                email: emailAdress,
                password: userPassword,
            }, function(err, response) {
                if (err) {
                    var err = new Error();
                    err.status = 500;
                    err.message = "failed to write to DB";
                    next(err);
                    return;
                }
                response.json({
                    message: "OK",
                    sessionId: sessionId
                });
                response.statusCode = 200;
                response.send();
            })
        } else {
            var err = new Error();
            err.status = 409;
            next(err);
        }

    });
});


module.exports = router;
