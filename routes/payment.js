var express = require('express');
var router = express.Router();

router.get('/:lang', function (req, res, next) {
    res.render('payment', {
    });
});

module.exports = router;