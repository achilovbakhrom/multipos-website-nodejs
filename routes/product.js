var express = require('express');
var router = express.Router();

var moment = require('moment');

var Products = require('../modal/plan');

router.get('/:page/:lang', function(req, res, next) {
    // console.log(req.headers["accept-language"]);
    // console.log(window.location.hash);
    var perPage = 5;
    var page = req.params.page || 1;
    if(page < 1){
        page = 1
    }

    Products.resultAndCount(perPage, page,function (err, resultAndCount) {
        if (err) {
            let err = new Error();
            err.status = 500;
            err.message = "failed to read DB";
            next(err);
            return;
        }

        let blogs = resultAndCount.elements;

        let result = blogs.map(millisToDate);

        function millisToDate(value, index, array) {
            value.date = moment(value.date).format('MMMM DD YYYY');
            return value
        }

        res.render('blog_standard', {result: result, current: page, pages: Math.ceil(resultAndCount.count / perPage), lang: req.params.lang});
    });
});

router.post("/save", function (req, response, next) {

    var newPlan = {
        planNameEn: req.body.planNameEn,
        planNameRu: req.body.planNameRu,
        date : Date.now(),
        image: req.body.image,
        shortTextEn: req.body.shortTextEn,
        shortTextRu: req.body.shortTextRu,
        fullTextEn: req.body.fullTextEn,
        fullTextRu: req.body.fullTextRu,
        active: true
    };

    Products.create(newPlan, function (err, res) {
        if (err) {
            var err = new Error();
            err.status = 500;
            err.message = "failed to write to DB";
            next(err);
        }
    });
    response.redirect("/blog-standard/1");
});

router.post("/update", function (req, response, next) {

    var updateProduct = {
        _id: req._id,
        titleEn: req.body.titleEn,
        titleRu: req.body.titleRu,
        date : Date.now(),
        image: req.body.image,
        shortTextEn: req.body.shortTextEn,
        shortTextRu: req.body.shortTextRu,
        fullTextEn: req.body.fullTextEn,
        fullTextRu: req.body.fullTextRu,
        active: true
    };

    Products.update(updateProduct, function (err, res) {
        if (err) {
            var err = new Error();
            err.status = 500;
            err.message = "failed to write to DB";
            next(err);
        }
    });
    response.redirect("/blog-standard/1");
});

router.post("/delete", function (req, response, next) {

    var updateProduct = {
        _id: req._id,
        titleEn: req.body.titleEn,
        titleRu: req.body.titleRu,
        date : Date.now(),
        image: req.body.image,
        shortTextEn: req.body.shortTextEn,
        shortTextRu: req.body.shortTextRu,
        fullTextEn: req.body.fullTextEn,
        fullTextRu: req.body.fullTextRu,
        active: false
    };
    Products.delete(updateProduct, function (err, res) {
        if (err) {
            var err = new Error();
            err.status = 500;
            err.message = "failed to write to DB";
            next(err);
        }
    });
    response.redirect("/blog-standard/1");
});


module.exports = router;
