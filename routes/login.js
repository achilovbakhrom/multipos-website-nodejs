var express = require('express');
var router = express.Router();

var Users = require('../modal/user');

/* GET home page. */
router.get('/:lang', function(req, res, next) {
    res.render('login');
});

router.post('/token', function (request, response, next) {
     let email = request.body.email;
     let password = request.body.password;
     Users.findByEmail(email, function (err, res) {
         if(err){
             let err = new Error();
             err.status = 500;
             err.message = "DB read is failed";
             next(err);
             return;
         }
         if(res.length !== 0){
             let guid = function() {
                 function s4() {
                     return Math.floor((1 + Math.random()) * 0x10000)
                         .toString(16)
                         .substring(1);
                 }
                 return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                     s4() + '-' + s4() + s4() + s4();
             };
             if(res[0].password !== password){
                 let err = new Error();
                 err.status = 401;
                 err.message = "Unauthorized: wrong password";
                 next(err);
                 return;
             }
             response.json({
                 message: "OK"
             });
             response.statusCode = 200;
             response.send();
         } else {
             let err = new Error;
             err.status = 404;
             next(err);
         }
     })
});

module.exports = router;
