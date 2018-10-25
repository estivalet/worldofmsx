var fs = require('fs');
var async = require('async');

var obj = JSON.parse(fs.readFileSync('C:/Users/luisoft/git/glog-scrapper/data/mobygames/MSX - MSX 1/json/4th-unit.json', 'utf8'));
console.log(obj);

var mongoose = require('mongoose');
const models = require('../models/schema.model.js');
mongoose.connect('mongodb://localhost/msxdb', function (err) {
    if (err) throw err;
     
    console.log('Successfully connected');

    async.parallel({
        publisher: function(callback) {
            models.Company.findOne({name:obj.publishedBy.replace(String.fromCharCode(65533)," ")}).exec(function(err,company) {
                if(err) callback(true, '{"error":"' + error + '"}');
                callback(null, company);
            });
        },
        developer: function(callback) {
            models.Company.findOne({name:obj.developedBy.replace(String.fromCharCode(65533)," ")}).exec(function(err,company) {
                if(err) callback(true, '{"error":"' + error + '"}');
                callback(null, company);
            });
        },
    }, function(err, results){
        const software = new models.Software({
            name: obj.name,
            type: "Game",
            year: obj.released,
            publisher: results.publisher.id,
            developer: results.developer.id
    
        });
    
        software.save(function(err) {
            if(err) throw err;
    
        });
    
    
    });


});