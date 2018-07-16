var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('call_to_action', {
    });
});

module.exports = router;