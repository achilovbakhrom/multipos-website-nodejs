let db = require("../db");


exports.get = function(callback)
{
    db.get().collection('users').find().toArray(function(err, doc) {
        callback(err, doc)
    });
};

exports.create = function (users, callback)
{
    db.get().collection('users').insert(users, function(err, res)
    {
        callback(err, res)
    });
};

exports.findById = function (id, callback)
{
    db.get().collection('users').findOne({_id:id}, function (err, res) {
        callback(err, res);
    })
};

exports.findByEmail = function(email, callback)
{
    db.get().collection('users').find({email:email}).toArray(function(err, doc) {
        callback(err, doc)
    });
};

exports.findByEmailAndConfirmationNumber = function(email, confirmationNumber, callback)
{
    db.get().collection('users').find({email:email, confirmationNumber: confirmationNumber}).toArray(function(err, doc) {
        callback(err, doc)
    });
};

exports.update = function (user, callback)
{
    let SelectParas = {"_id": user._id};
    db.get().collection('users').update(SelectParas, user, function(err, res)
    {
        callback(err, res)
    });
};
