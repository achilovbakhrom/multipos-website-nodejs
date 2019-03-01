var express = require('express');
var router = express.Router();

router.get('/:lang', function (req, res, next) {
    res.render('shop_single', {
    });
});
module.exports = router;