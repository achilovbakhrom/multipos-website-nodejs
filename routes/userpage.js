var express = require('express');
var router = express.Router();

var User = require('../modal/user');
var PurchaseHistory = require('../modal/purchase_history');
var moment = require('moment');

/* GET home page. */
router.get('/:lang', function (req, res, next) {
    if (req.cookies.username) {
        var username = req.cookies.username;
        User.findByEmail(username, function (err, user) {
            if (err) {
                let err = new Error();
                err.status = 500;
                err.message = "failed to read DB";
                next(err);
            }
            PurchaseHistory.findByEmail(username, function (error, histories) {
                if (error) {
                    let err = new Error();
                    err.status = 500;
                    err.message = "failed to read DB";
                    next(err);
                }

                let formattedHistories = histories.map(formatHistories);

                function formatHistories(value, index, array) {
                    value.purchaseDate = moment(value.purchaseDate).format('MMMM DD YYYY');
                    if (value.activationDate) {
                        value.activationDate = moment(value.activationDate).format('MMMM DD YYYY');
                    } else {
                        value.activationDate = "N/A"
                    }
                    if (value.expirationDate) {
                        value.expirationDate = moment(value.expirationDate).format('MMMM DD YYYY');
                    } else {
                        value.expirationDate = "N/A"
                    }
                    if (!value.company) {
                        value.company = "N/A"
                    }
                    return value
                }

                let currentUser = user[0];
                res.render('userpage', {user: currentUser, histories: formattedHistories, lang: req.params.lang})
            });
        });
    } else {
        res.redirect('/' + req.params.lang);
    }
});

router.post("/profileImage", function (req, response, next) {

    if (req.cookies.username) {
        var username = req.cookies.username;
        User.findByEmail(username, function (err, user) {
            if (err) {
                let err = new Error();
                err.status = 500;
                err.message = "failed to read DB";
                next(err);
            }
            let resultFile = req.body;

            console.log(resultFile);
            user[0].imageUrl = req.body.imageUrl;
            // response.redirect('back');           //where to go next
            User.update(user[0], function (error, result) {
                if(error){
                    let err = new Error();
                    err.status = 500;
                    err.message = "failed to update DB";
                    next(err);
                }
                response.redirect('back');           //where to go next

            })

        });
    } else {
        response.redirect('/' + req.params.lang);
    }
});

router.post("/updateProfile", function (req, response, next) {
    console.log("here");

    if (req.cookies.username) {
        console.log("here2");

        var username = req.cookies.username;
        User.findByEmail(username, function (err, user) {
            if (err) {
                console.log("here error");
                let err = new Error();
                err.status = 500;
                err.message = "failed to read DB";
                next(err);
            }
            user[0].firstName = req.body.firstName;
            user[0].lastName = req.body.lastName;
            user[0].address = req.body.address;
            console.log(user[0]);
            // response.redirect('back');           //where to go next
            User.update(user[0], function (error, result) {
                if(error){
                    let err = new Error();
                    err.status = 500;
                    err.message = "failed to update DB";
                    next(err);
                }
                response.redirect('back');           //where to go next

            })

        });
    } else {
        response.redirect('/' + req.params.lang);
    }
});


module.exports = router;
