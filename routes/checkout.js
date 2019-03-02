var express = require('express');
var router = express.Router();

var Plan = require('../modal/plan');
var PurchaseHistory = require('../modal/purchase_history');

router.get('/:lang', function (req, res, next) {
    res.render('checkout', {
    });
});

router.get('/:planId/:lang', function (req, res, next) {

    Plan.findById(req.params.planId, function (err, plan) {
        if (err) {
            let err = new Error();
            err.status = 500;
            err.message = "failed to read DB";
            next(err);
        }
        res.render('checkout', {lang: req.params.lang, plan: plan});
    });
});

router.post('/process', function (req, res, next) {
    // console.log(req.body);

    if(req.cookies.username){
        var username = req.cookies.username;
        Plan.findById(req.body.planId, function (err, plan) {
            if (err){
                let err = new Error();
                err.status = 500;
                err.message = "failed to read DB";
                next(err);
            }
            var purchaseHistory = {
                username: username,
                plan: plan,
                purchaseDate: Date.now(),
                activationDate: null,
                expirationDate: null,
                company: null,
                price: plan.price
            };
            PurchaseHistory.create(purchaseHistory,function (error, history) {
                if (error){
                    let err = new Error();
                    err.status = 500;
                    err.message = "failed to write to DB";
                    next(err);
                }
            });
            res.send("Success")
        });
    } else {
        res.send("Fuck You")
    }



    // Plan.findById(req.params.planId, function (err, plan) {
    //     if (err) {
    //         let err = new Error();
    //         err.status = 500;
    //         err.message = "failed to read DB";
    //         next(err);
    //     }
    //     res.render('checkout', {lang: req.params.lang, plan: plan});
    // });
});

module.exports = router;