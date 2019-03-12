var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


var Users = require('../modal/user');

/* GET home page. */
router.get('/:lang', function(req, res, next) {
    res.render('registration', {lang: req.params.lang});
});

router.post("/save/:lang", function (req, response, next) {
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var emailAdress = req.body.email;
    var userPassword = req.body.password;
    var confirmPassword = req.body.comfirm;

    Users.findByEmail(emailAdress, function(err, res) {

        if (err) {
            let err = new Error();
            err.status = 500;
            err.message = "DB read is failed";
            next(err);
            return;
        }
        if (res.length === 0) {

            // let guid = function() {
            //     function s4() {
            //         return Math.floor((1 + Math.random()) * 0x10000)
            //             .toString(16)
            //             .substring(1);
            //     }
            //     return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            //         s4() + '-' + s4() + s4() + s4();
            // };
            // let sessionId = guid();
            let confirmationNumber = Math.floor(Math.random() * 999999) + 100000;
            Users.create({
                firstName: firstName,
                lastName: lastName,
                email: emailAdress,
                password: userPassword,
                confirmationNumber: confirmationNumber,
                confirmed: false,
                role: 'user',
                imageUrl: '../../images/userprofile/user1.svg',
                address: ''
            }, function(err, res) {
                if (err) {
                    var err = new Error();
                    err.status = 500;
                    err.message = "failed to write to DB";
                    next(err);
                    return;
                }

                let transporter = nodemailer.createTransport({
                    service: "Gmail",
                    auth: {
                        user: 'basicstepsdevelopment@gmail.com', // generated ethereal user
                        pass: '02082009madina' // generated ethereal password
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });

                let mailOptions = {
                    from: 'Multipos Support', // sender address
                    to: emailAdress, // list of receivers
                    subject: 'Activation Code', // Subject line
                    text: "Dear " + firstName + " " + lastName + '\n' + "Your Activation Code: " + confirmationNumber + '\n' + "Best Regards," + '\n' + "Multipos Team" // plain text body
                };


                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    next(res)
                });
            })
        } else {
            var err = new Error();
            err.status = 409;
            next(err);
        }
    });
});


module.exports = router;
