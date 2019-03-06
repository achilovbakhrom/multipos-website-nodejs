var express = require('express');
var router = express.Router();

var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation

var app = express();
app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));

var User = require('../modal/user');
var PurchaseHistory = require('../modal/purchase_history');
var moment = require('moment');

/* GET home page. */
router.get('/:lang', function(req, res, next) {
    if(req.cookies.username){
        var username = req.cookies.username;
        User.findByEmail(username, function (err, user) {
            if(err){
                let err = new Error();
                err.status = 500;
                err.message = "failed to read DB";
                next(err);
            }
            PurchaseHistory.findByEmail(username, function (error, histories) {
                if(error){
                    let err = new Error();
                    err.status = 500;
                    err.message = "failed to read DB";
                    next(err);
                }

                let formattedHistories = histories.map(formatHistories);

                function formatHistories(value, index, array) {
                    value.purchaseDate = moment(value.purchaseDate).format('MMMM DD YYYY');
                    if(value.activationDate){
                        value.activationDate = moment(value.activationDate).format('MMMM DD YYYY');
                    } else {
                        value.activationDate = "N/A"
                    }
                    if(value.expirationDate){
                        value.expirationDate = moment(value.expirationDate).format('MMMM DD YYYY');
                    } else {
                        value.expirationDate = "N/A"
                    }
                    if(!value.company){
                        value.company = "N/A"
                    }
                    return value
                }
                console.log(formattedHistories);

                let currentUser = user[0];
                res.render('userpage', {user: currentUser, histories: formattedHistories, lang:req.params.lang})
            });
        });
    } else {
        res.redirect('/'+req.params.lang);
    }
});

app.route('/uploadphoto')
    .post(function (req, res, next) {

        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/img/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                console.log("Upload Finished of " + filename);
                res.redirect('back');           //where to go next
            });
        });
    });

var server = app.listen(3030, function() {
    console.log('Listening on port %d', server.address().port);
});

module.exports = router;
