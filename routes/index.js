var express = require('express');
var router = express.Router();

var Plan = require('../modal/plan');
var Blog = require('../modal/blog');

/* GET home page. */
router.get('/:lang', async function(req, res, next) {

  Plan.get(function (e, plans) {
    if(e){
      const err = new Error();
      err.status = 500;
      err.message = "failed read DB";
      next(err);
    }
    Blog.resultAndCount(3, 1, function (error, blogs) {
      if(error){
        const err = new Error();
        err.status = 500;
        err.message = "failed read DB";
        next(err);
      }
      var data = {
        lang:req.params.lang,
        plans: plans,
        blogs:blogs
      };
      res.render('index', {data: data});
    })


  });
  // console.log(plans);
  // res.render('index', {lang:req.params.lang
  // });
});

module.exports = router;
