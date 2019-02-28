let db = require("../db");
const mongodb = require("mongodb");


exports.get = function(callback)
{
    db.get().collection('product').find().toArray(function(err, doc) {
        callback(err, doc)
    });
};

exports.create = function (product, callback)
{
    db.get().collection('product').insert(product, function(err, res)
    {
        callback(err, res)
    });
};

exports.update = function (product, callback)
{
    db.get().collection('product').update(product, function(err, res)
    {
        callback(err, res)
    });
};

exports.findById = function (id, callback)
{
    db.get().collection('product').findOne({_id: mongodb.ObjectID(id)}, function(error, product) {
        callback(error, product);
    });
};

exports.delete = function (id, callback)
{
    db.get().collection('product').delete({_id:mongodb.ObjectID(id)}, function(err, res) {
        callback(err, res);
    })
};