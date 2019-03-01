let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
// var i18n = require('../../i18n');
var i18n = require('i18n')
i18n.configure({
    locales: ['en', 'ru'],
    register: funkyObject,
    directory: __dirname + '/locales'
});

var funkyObject = {};

let oauthserver  = require('oauth2-server');

let index = require('./routes/index');
let users = require('./routes/users');
let login = require('./routes/login');
let register = require('./routes/register');
let about = require('./routes/about');
let support = require('./routes/support');
let userpage = require('./routes/userpage');
let faq = require('./routes/faq');
let faql = require('./routes/faql');
let features = require('./routes/features');
let career_protech = require('./routes/career_protech');
let how_it_work = require('./routes/how_it_work');
let pricing = require('./routes/pricing');
let portfolio = require('./routes/portfolio');
let apply_job = require('./routes/apply_job');
let contact = require('./routes/contact');
let privacy_policy = require('./routes/privacy_policy');
let payment = require('./routes/payment');
let components = require('./routes/components');
let blog_grid = require('./routes/blog_grid');
let blog_grid_sidebar = require('./routes/blog_grid_sidebar');
let blog_list= require('./routes/blog_list');
let blog_standard = require('./routes/blog_standard');
let blog_single = require('./routes/blog_single');
let shop_grid = require('./routes/shop_grid');
let shop_grid_sidebar = require('./routes/shop_grid_sidebar');
let shop_single = require('./routes/shop_single');
let cart = require('./routes/cart');
let checkout = require('./routes/checkout');
let features_blocks = require('./routes/features_blocks');
let call_to_action = require('./routes/call_to_action');
let marketing_blocks = require('./routes/marketing_blocks');
let team_blocks = require('./routes/team_blocks');
let testimonial_blocks = require('./routes/testimonial_blocks');
let blog_blocks = require('./routes/blog_blocks');
let app = express();
let db = require("./db");
// view engine setup
app.engine('ejs', require('ejs-locals'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// var authenticateRequest = function (req, res, next) {
//
//     console.log(req);
//     var request = new Request(req);
//     var response = new Response(res);
//
//     return app.oauth.authenticate(request, response)
//         .then(function(token) {
//
//             next();
//         }).catch(function(err) {
//
//             res.status(err.code || 500).json(err);
//         });
// };
// console.log(typeof authenticateRequest);
// exports.method = authenticateRequest;

app.post('/support',  function (req, res) {
       var name = req.body.name;
       var email = req.body.email;
       var message = req.body.message;
       var number = req.body.phone;
       var company = req.body.company;

    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: 's.nodir9494@gmail.com', // generated ethereal user
            pass: 'goroskop123' // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: '"Multipos Contact" <s.nodir_94@mail.ru>', // sender address
        to: 's.nodir_94@mail.ru', // list of receivers
        subject: 'User support', // Subject line
        text: "Name: " + name + '\n' + "Email: " + email + '\n'+ "Phone: " + number + '\n'+ "Company: " + company + '\n' + "Text: " + message + '\n' // plain text body
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.redirect('/');
    });
});
// oauth area
app.oauth = oauthserver({
    model: require("./model.js"),
    grants: ['password'],
    debug: true
});

app.use('/', index);
app.use('/users', users );
app.use('/login', login);
app.use('/register', register);
app.use('/about', about);
app.use('/support', support);
app.use('/userpage', userpage);
app.use('/faq', faq);
app.use('/faql', faql);
app.use('/features', features);
app.use('/career-protech', career_protech);
app.use('/how-it-work', how_it_work);
app.use('/pricing', pricing);
app.use('/portfolio', portfolio);
app.use('/apply-job', apply_job);
app.use('/contact', contact);
app.use('/privacy-policy', privacy_policy);
app.use('/payment', payment);
// app.use('/components', components);
app.use('/blog-grid', blog_grid);
app.use('/blog-grid-sidebar', blog_grid_sidebar);
app.use('/addblog', blog_list);
app.use('/blog-standard', blog_standard);
app.use('/blog-single', blog_single);
app.use('/shop-grid', shop_grid);
app.use('/shop-grid-sidebar', shop_grid_sidebar);
app.use('/shop-single', shop_single);
app.use('/cart', cart);
app.use('/checkout', checkout);
app.use('/features-blocks', features_blocks);
app.use('/call-to-action', call_to_action);
app.use('/marketing-blocks', marketing_blocks);
app.use('/team-blocks', team_blocks);
app.use('/team-blocks', team_blocks);
app.use('/testimonial-blocks', testimonial_blocks);
app.use('/blog-blocks', blog_blocks);


app.all('/oauth/token', app.oauth.grant());

// oauth area end

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error("Not found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log("log: " + err.message);
  // render the error page
  res.status(err.status || 500);
  res.render('error', {message: err.message});
});

app.use(app.oauth.errorHandler());

db.connect("mongodb://localhost:27017/multipos", function (err){
    if(err){
        console.log(err);
        return res.sendStatus(500);
    }
    else{
        console.log("Db connect");
    }
});

// function testAuth() {
//     return new authenticateRequest;
// }

// console.log(typeof authenticateRequest);
// console.log(typeof authenticateRequest);
// module.exports = {
//     app: app,
//     // authReq: testAuth
// };
module.exports = app;
// module.exports = authenticateRequest;
