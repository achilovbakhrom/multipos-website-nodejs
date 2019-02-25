var express = require('express');
var router = express.Router();

var Users = require('../modal/user');

/* GET home page. */
router.get('/:lang', function(req, res, next) {
    res.render('registration');
});

router.post("/save/:lang", function (req, response, next) {
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var companyName = req.body.company_name;
    var emailAdress = req.body.email;
    var userPassword = req.body.password;
    var confirmPassword = req.body.comfirm;

    Users.findByEmail(emailAdress, function(err, res) {

        if (err) {
            let err = new Error();
            err.status = 500;
            err.message = "DB read is failed";
            next(err);
            return;
        }
        if (res.length === 0) {
            let guid = function() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            };
            let sessionId = guid();
            Users.create({
                firstName: firstName,
                lastName: lastName,
                copmanyName: companyName,
                email: emailAdress,
                password: userPassword,
                comfirms: confirmPassword,
                role: 'user',
            }, function(err, res) {
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
