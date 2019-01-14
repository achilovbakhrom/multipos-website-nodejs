var express = require('express');
var router = express.Router();

var moment = require('moment');

var Blogs = require('../modal/blog');

/* GET home page. */

router.get('/:page', function(req, res, next) {
    // console.log(req.headers["accept-language"]);
    console.log(req);
    // console.log(window.location.hash);
    var perPage = 5;
    var page = req.params.page || 1;
    if(page < 1){
        page = 1
    }

    Blogs.resultAndCount(perPage, page,function (err, resultAndCount) {
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

        res.render('blog_standard', {result: result, current: page, pages: Math.ceil(resultAndCount.count / perPage)});
    });
});

router.post("/save", function (req, response, next) {

    var newBlog = {
        titleEn: req.body.titleEn,
        titleRu: req.body.titleRu,
        date : Date.now(),
        image: req.body.image,
        shortTextEn: req.body.shortTextEn,
        shortTextRu: req.body.shortTextRu,
        fullTextEn: req.body.fullTextEn,
        fullTextRu: req.body.fullTextRu
    };

    Blogs.create(newBlog, function (err, res) {
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
