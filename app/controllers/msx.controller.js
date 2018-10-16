var request = require('request');
var async = require('async');

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
                    url: 'http://localhost:4000/games?page=1',
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
                res.render('index', {
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
