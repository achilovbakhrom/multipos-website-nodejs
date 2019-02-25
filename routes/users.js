var express = require('express');
var router = express.Router();
var Users = require('../modal/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/:email', function (req, res, next) {
  Users.findByEmail(req.params.email,function (err, users) {
    if (err) {
      let err = new Error();
      err.status = 500;
      err.message = "failed to read DB";
      next(err);
      return;
    }

    res.send( users[0].role.toString());
  });

});



module.exports = router;
