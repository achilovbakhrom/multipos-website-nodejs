var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.render('how_it_works', {
    })
});

module.exports = router;