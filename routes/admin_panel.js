var express = require('express');
var router = express.Router();

var Plans = require('../modal/plan');

router.get('/create-blog/:lang', function (req, res, next) {
    res.render('addblog', {
    });
});

router.get('/create-pricing/:lang', function (req, res, next) {
    res.render('pricing_create', {
    })
});

router.get('/plan/:lang', function (req, res, next) {
    res.render('pricing_admin', {
    })
});

router.post("/plan/save", function (req, response, next) {

    var active = false;
    if(req.body.active === "on"){
        active = true;
    }

    var newPlan = {
        planNameEn: req.body.planNameEn,
        planNameRu: req.body.planNameRu,
        date : Date.now(),
        image: req.body.image,
        price: parseFloat(req.body.price),
        cashierLimit: parseInt(req.body.cashierLimit, 10),
        adminLimit: parseInt(req.body.adminLimit, 10),
        active: active
    };

    Plans.create(newPlan, function (err, res) {
        if (err) {
            var err = new Error();
            err.status = 500;
            err.message = "failed to write to DB";
            next(err);
        }
    });
    response.redirect("/admin-panel/plan/en");
});

module.exports = router;