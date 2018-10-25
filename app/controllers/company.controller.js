const models = require('../models/schema.model.js');
var async = require('async');
var request = require('request');

exports.index = (req, res) => {
    async.parallel({
        countries: function(callback) {
            request.get({
                url: 'http://localhost:4000/country',
            }, function(error, response, body){
                if(error) {
                    console.log(error);
                    callback(true, {});
                } else {
                    callback(null, body);
                }
            });
        },
    }, function(err, results){
        console.log(results.genres)
        res.render('company/index', { title: 'Company Page', error: err, countries: JSON.parse(results.countries) });
    });    
}

// Create and Save a new genre
exports.create = (req, res) => {
    try {

    // Create a genre.
    const genre = new models.Genre({
        name: req.body.name
    });

    // Save a genre in the database.
    genre.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            console.log("errrrrrr" +err )
            res.status(500).send(
                {   message: err.message || "Some error occurred while creating the Country." }
        );
    });
    }catch(err) {
        console.log(err);
    }
};

// Retrieve and return all countries from the database.
exports.findAll = (req, res) => {
    var perPage = 10;
    var page = req.query.page;

    // if a number of page is passed as a parameter use it, otherwise list all genres.
    if(page) {
        console.log('pgaed!!!!!' + page);
        models.Company.find({})
        .collation({locale: "en" }) 
        .sort({'name': 1})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, genres) {
            models.Company.countDocuments().exec(function(err, count) {
                
                if(err) return next(err);
                
                result = {
                    companys: genres,
                    current: page,
                    pages: Math.ceil(count / perPage)
                };
                console.log("SENDING RESULT-->" + result);
                res.send(result);
            })
        });
    } else {
        models.Company.find()
        .then(companys => {
            res.send(companys);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving genres."
            });
        });        
    }
};

exports.findAll2 = (req, res) => {
    try {
    var perPage = parseInt(req.query.length);
    var page = parseInt(req.query.draw);

    console.log("-------->" + perPage);
    console.log("-------->" + page);

    // if a number of page is passed as a parameter use it, otherwise list all genres.
    if(page) {
        models.Company.find({})
        .collation({locale: "en" }) 
        .sort({'name': 1})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, companys) {
            console.log("-->" + companys);
            var lines=[];
            companys.forEach(function(element) {
                console.log(element.name);
                var line=[];
                line.push(element.name);
                lines.push(line);
            });
            console.log("names->" + lines);
            models.Company.countDocuments().exec(function(err, count) {
                if(err) return next(err);
                
                result = {
                    draw: "1",
                    recordsFiltered: count,
                    recordsTotal: count,
                    data: 
                        lines
                    
                };
                console.log("SENDING RESULT-->" + result);
                console.log(result.data);
                res.send(result);
            })
        });
    } else {
        models.Company.find()
        .then(companys => {
            res.send(companys);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving genres."
            });
        });        
    }
} catch(err) {
    console.log(err);
}
};

// Find a single country with a countryId
exports.findOne = (req, res) => {
    models.Genre.findById(req.params.genreId)
    .then(genre => {
        if(!genre) {
            return res.status(404).send({
                message: "genre not found with id " + req.params.genreId
            });            
        }
        res.send(genre);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "genre not found with id " + req.params.genreId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving genre with id " + req.params.genreId
        });
    });
};

// Update a country identified by the countryId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    models.Genre.findByIdAndUpdate(req.params.genreId, {
        name: req.body.name
    }, {new: true})
    .then(genre => {
        if(!genre) {
            return res.status(404).send({
                message: "genre not found with id " + req.params.genreId
            });
        }
        res.send(genre);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "genre not found with id " + req.params.genreId
            });                
        }
        return res.status(500).send({
            message: "Error updating genre with id " + req.params.genreId
        });
    });
};

// Delete a country with the specified countryId in the request
exports.delete = (req, res) => {
    models.Genre.findByIdAndRemove(req.params.genreId)
        .then(genre => {
            if(!genre) {
                return res.status(404).send({
                    message: "genre not found with id " + req.params.genreId
                });
            }
            res.send({message: "genre deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "genre not found with id " + req.params.genreId
                });                
            }
            return res.status(500).send({
                message: "Could not delete genre with id " + req.params.genreId
            });
    });
};