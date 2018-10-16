const Game = require('../models/game.model.js');

exports.list = function(req, res, next) {
    var perPage = 10;
    var page = req.query.page || 1;

    console.log("PAGED--------------------------------");
    Game.find({})
    .sort({'name': 1})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, games) {
        Game.countDocuments().exec(function(err, count) {
            
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
