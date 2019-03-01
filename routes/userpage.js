var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:lang', function(req, res, next) {
    res.render('userpage', {
    });
});

module.exports = router;
