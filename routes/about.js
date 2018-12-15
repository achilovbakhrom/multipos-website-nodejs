var getToken = require("../model");


var express = require('express');

var router = express.Router();

var app = require("../app");


let oauthserver  = require('oauth2-server');

app.oauth = oauthserver({
    model: require("../model.js"),
    grants: ['password'],
    debug: true
});


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('about', {});
});

module.exports = router;

/*app.oauth.authorise()*/