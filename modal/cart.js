let db = require("../db");
const mongodb = require("mongodb");


exports.get = function(callback)
{
    db.get().collection('cart').find().toArray(function(err, doc) {
        callback(err, doc)
    });
};

exports.findByEmail = function(email, callback)
{
    db.get().collection('cart').find({email: email}).toArray(function (err, res) {
        callback(err, res)
    });
};
//
// exports.resultAndCount = function(perPage, page, callback)
// {
//     let skip = (perPage * page) - perPage;
//     db.get().collection('cart').find({}, {skip: skip, limit:perPage}).sort({date: -1}).toArray(function(err, elements) {
//         db.get().collection('cart').count(function(err, count) {
//             let result = {elements: elements, count: count};
//             callback(err, result)
//         });
//     });
//
//
// };

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

exports.delete = function (id, callback)
{
    db.get().collection('cart').delete({_id:mongodb.ObjectID(id)}, function(err, res) {
        callback(err, res);
    })
};