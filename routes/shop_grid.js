var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('shop_grid', {
    });
});

module.exports = router;