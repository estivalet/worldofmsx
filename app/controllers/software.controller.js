const models = require('../models/schema.model.js');
var async = require('async');
var request = require('request');

exports.index = (req, res) => {
    try{
    async.parallel({
        genres: function(callback) {
            request.get({
                url: 'http://localhost:4000/genre',
            }, function(error, response, body){
                if(error) {
                    console.log(error);
                    callback(true, {});
                } else {
                    //console.log(response.statusCode, body);
                    callback(null, body);
                }
            });    
        },
        countries: function(callback) {
            request.get({
                url: 'http://localhost:4000/country',
            }, function(error, response, body){
                if(error) {
                    console.log(error);
                    callback(true, {});
                } else {
                    //console.log(response.statusCode, body);
                    callback(null, body);
                }
            });
        },
    }, function(err, results){
        console.log(results.genres)
        res.render('software/index', { title: 'Software Page', error: err, genres: JSON.parse(results.genres), countries: JSON.parse(results.countries) });
    });
}catch(err) {
    console.log(err);
}
}

// Create and Save a new software
exports.create = (req, res) => {
    try {
    console.log("----------->" + req.body.name);
    console.log("----------->" + req.body.country);

    // Create a software.
    const software = new models.Software({
        name: req.body.name,
        country: req.body.country
    });

    // Save a software in the database.
    software.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log("errrrrrr" +err )
            res.status(500).send(
                {   message: err.message || "Some error occurred while creating the software." }
        );
    });
}catch(err) {
    console.log(err);
}
};

// Retrieve and return all countries from the database.
exports.findAll = (req, res) => {
    models.Software
    .find()
    .populate('country')
    .then(softwares => {
        res.send(softwares);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single software with a softwareId
exports.findOne = (req, res) => {

};

// Update a software identified by the softwareId in the request
exports.update = (req, res) => {

};

// Delete a software with the specified softwareId in the request
exports.delete = (req, res) => {

};