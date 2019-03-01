var express = require('express');
var router = express.Router();

var Plan = require('../modal/plan');

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

module.exports = router;