var express = require('express');
var router = express.Router();

var Users = require('../modal/user');

/* GET home page. */
router.get('/:lang', function(req, res, next) {
    res.render('confirmation', {lang: req.params.lang});
});

router.post('/confirm', function (request, response, next) {
    let email = request.body.email;
    let confirmationNumber = parseInt(request.body.confirmationNumber, 10);
    Users.findByEmailAndConfirmationNumber(email, confirmationNumber, function (err, res) {
        if(err){
            let err = new Error();
            err.status = 500;
            err.message = "DB read is failed";
            next(err);
            return;
        }
        if(res.length !== 0){
            let user = res[0];
            let guid = function() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            };
            if(user.confirmationNumber !== confirmationNumber){
                let err = new Error();
                err.status = 401;
                err.message = "Wrong confirmation number";
                next(err);
                return;
            }
            user.confirmed = true;
            Users.update(user, function (err, result) {
                if(err){
                    let err = new Error();
                    err.status = 500;
                    err.message = "Something went wrong, Please try again later!";
                    next(err);
                    return;
                }
                response.redirect('/login/en');
            });
        } else {
            let err = new Error;
            err.status = 404;
            next(err);
        }
    })
});

module.exports = router;
