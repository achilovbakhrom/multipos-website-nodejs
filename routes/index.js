var express = require('express');
var router = express.Router();

var Plan = require('../modal/plan');
var Blog = require('../modal/blog');
var moment = require('moment');

/* GET home page. */
router.get('/:lang', async function(req, res, next) {

  Plan.get(function (e, plans) {
    if(e){
      const err = new Error();
      err.status = 500;
      err.message = "failed read DB";
      next(err);
    }
    Blog.resultAndCount(2, 1, function (error, result) {
      if(error){
        const err = new Error();
        err.status = 500;
        err.message = "failed read DB";
        next(err);
      }
      function millisToDate(value, index, array) {
        value.date = moment(value.date).format('MMMM DD YYYY');
        return value
      }
      let blog = result.elements.map(millisToDate);

      let authorised = false;
      if(req.cookies.username){
        authorised = true
      }

      const data = {
        lang: req.params.lang,
        plans: plans,
        blog: blog,
        authorised: authorised
      };
      res.render('index', {data: data});
    })


  });
});

module.exports = router;
