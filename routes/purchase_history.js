var express = require('express');
var router = express.Router();

var PurchaseHistory = require('../modal/purchase_history');

router.post("/add", function (req, response, next) {

    var newPurchaseHistory = {
        plan: req.body.plan,
        purhcaseDate: Date.now()
    };
    PurchaseHistory.create(newPurchaseHistory, function (err, res) {
        if (err) {
            var err = new Error();
            err.status = 500;
            err.message = "failed to write to DB";
            next(err);
        }
    });
    response.status(201).send({});

    var newPlan = {
        planNameEn: req.body.planNameEn,
        planNameRu: req.body.planNameRu,
        date: Date.now(),
        image: req.body.image,
        price: parseFloat(req.body.price),
        cashierLimit: parseInt(req.body.cashierLimit, 10),
        adminLimit: parseInt(req.body.adminLimit, 10)
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