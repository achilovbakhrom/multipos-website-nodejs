let db = require("../db");
const mongodb = require("mongodb");


exports.get = function(callback)
{
    db.get().collection('blog').find().toArray(function(err, doc) {
        callback(err, doc)
    });
};

exports.resultAndCount = function(perPage, page, callback)
{
    let skip = (perPage * page) - perPage;
    db.get().collection('blog').find({}, {skip: skip, limit:perPage}).sort({date: -1}).toArray(function(err, elements) {
        db.get().collection('blog').count(function(err, count) {
            let result = {elements: elements, count: count};
            callback(err, result)
        });
    });


};

exports.create = function (blog, callback)
{
    db.get().collection('blog').insert(blog, function(err, res)
    {
        callback(err, res)
    });
};

exports.findById = function (id, callback)
{
    db.get().collection('blog').findOne({_id: mongodb.ObjectID(id)}, function(error, blog) {
        callback(error, blog);
    });
};

exports.delete = function (id, callback)
{
    db.get().collection('blog').delete({_id:mongodb.ObjectID(id)}, function(err, res) {
        callback(err, res);
    })
};
