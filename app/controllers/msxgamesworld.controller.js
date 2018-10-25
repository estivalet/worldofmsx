var request = require('request');
var async = require('async');
const MSXGamesWorld = require('../models/msxgamesworld.model.js');

/**
 * Gets all necessary data to show in the index page.
 * @param {*} req 
 * @param {*} res 
 */
exports.index = function(req, res) {
    try{
        async.parallel({
            games: function(callback) {
                request.get({
                    url: 'http://localhost:4000/msxgamesworld?page=1',
                }, function(error, response, body){
                    if(error) {
                        callback(true, '{"error":"' + error + '"}');
                    } else {
                        console.log("body-->" + body);
                        callback(null, body);
                    }
                });    
            },
        }, function(err, results){
            
            let obj = JSON.parse(results.games);

            if(err) {
                res.render('error', { message: err });
            } else {
                res.render('msxgamesworld/index', {
                    title: "MSXDB"
                , games: obj.games
                , current: obj.current
                , pages: obj.pages
                });
            }
        });
    }catch(err) {
        console.log(err);
    }
};

exports.findAll = function(req, res, next) {
    var perPage = 10;
    var page = req.query.page || 1;

    console.log("PAGED--------------------------------");
    MSXGamesWorld.find({})
    .sort({'name': 1})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, games) {
        MSXGamesWorld.countDocuments().exec(function(err, count) {
            
            if(err) return next(err);
            
            result = {
                games: games,
                current: page,
                pages: Math.ceil(count / perPage)
            };
            console.log("SENDING RESULT-->" + result);
            res.send(result);
        })
    });

}
