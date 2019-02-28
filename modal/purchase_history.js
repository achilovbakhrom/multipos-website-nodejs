let db = require("../db");
const mongodb = require("mongodb");


exports.get = function(callback)
{
    db.get().collection('cart').find().toArray(function(err, doc) {
        // doc.sort(function(a, b){
        //     return new Date(b.purchaseDate) - new Date(a.purchaseDate);
        // });
        callback(err, doc)
    });
};

exports.findByEmail = function(email, callback)
{
    db.get().collection('cart').find({email: email}).toArray(function (err, res) {
        // doc.sort(function(a, b){
        //     return new Date(b.purchaseDate) - new Date(a.purchaseDate);
        // });
        callback(err, res)
    });
};

exports.create = function (cart, callback)
{
    db.get().collection('cart').insert(cart, function(err, res)
    {
        callback(err, res)
    });
};

exports.update = function (cart, callback)
{
    db.get().collection('cart').update(cart, function(err, res)
    {
        callback(err, res)
    });
};

exports.findById = function (id, callback)
{
    db.get().collection('cart').findOne({_id: mongodb.ObjectID(id)}, function(error, cart) {
        callback(error, cart);
    });
};