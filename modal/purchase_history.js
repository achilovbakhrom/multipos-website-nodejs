let db = require("../db");
const mongodb = require("mongodb");


exports.get = function(callback)
{
    db.get().collection('purchaseHistory').find().toArray(function(err, doc) {
        // doc.sort(function(a, b){
        //     return new Date(b.purchaseDate) - new Date(a.purchaseDate);
        // });
        callback(err, doc)
    });
};

exports.findByEmail = function(username, callback)
{

    db.get().collection('purchaseHistory').find({username: username}).sort({purchaseDate: -1}).toArray(function(err, elements) {
        callback(err, elements)
    });
    //
    //
    // db.get().collection('purchaseHistory').find({email: email}).toArray(function (err, res) {
    //     // doc.sort(function(a, b){
    //     //     return new Date(b.purchaseDate) - new Date(a.purchaseDate);
    //     // });
    //     callback(err, res)
    // });
};

exports.create = function (purchaseHistory, callback)
{
    db.get().collection('purchaseHistory').insert(purchaseHistory, function(err, res)
    {
        callback(err, res)
    });
};

exports.update = function (purchaseHistory, callback)
{
    db.get().collection('purchaseHistory').update(purchaseHistory, function(err, res)
    {
        callback(err, res)
    });
};

exports.findById = function (id, callback)
{
    db.get().collection('purchaseHistory').findOne({_id: mongodb.ObjectID(id)}, function(error, purchaseHistory) {
        callback(error, purchaseHistory);
    });
};