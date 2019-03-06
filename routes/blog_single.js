var express = require('express');
var router = express.Router();

var moment = require('moment');

var Blogs = require('../modal/blog');

router.get('/:blogId/:lang', function (req, res, next) {

    Blogs.findById(req.params.blogId,function (err, blog) {
        if (err) {
            let err = new Error();
            err.status = 500;
            err.message = "failed to read DB";
            next(err);
            return;
        }

        blog.date =  moment(blog.date).format('MMMM DD YYYY');

        console.log(blog);

        res.render('blog_single', {blog: blog, lang: req.params.lang});
    });

});

module.exports = router;