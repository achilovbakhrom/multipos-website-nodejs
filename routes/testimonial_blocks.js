var exopress = require('express');
var router = exopress.Router();

router.get('/', function (req, res, next) {
    res.render('testimonial_blocks', {
    });
});
module.exports = router;