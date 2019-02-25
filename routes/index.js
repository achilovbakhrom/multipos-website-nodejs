var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:lang', function(req, res, next) {
  res.render('index', {lang:req.params.lang
  });
});

module.exports = router;
