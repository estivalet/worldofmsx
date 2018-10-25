const models = require('../models/schema.model.js');
var async = require('async');
var request = require('request');

/**
 * Go to main page of License CRUD and list first page of data.
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.index = (req, res) => {
    async.parallel({
        licenses: function(callback) {
            request.get({
                url: 'http://localhost:4000/license?page=1',
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
        console.log(results.licenses)
        res.render('license/index', { title: 'License Page', error: err, licenses: JSON.parse(results.licenses) });
    });    
}

/**
 * 
 */
exports.create = (req, res) => {
    try {

    // Create a license.
    const license = new models.License({
        name: req.body.name
    });

    // Save a license in the database.
    license.save()
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

    // if a number of page is passed as a parameter use it, otherwise list all licenses.
    if(page) {
        models.License.find({})
        .sort({'name': 1})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, licenses) {
            models.License.countDocuments().exec(function(err, count) {
                
                if(err) return next(err);
                
                result = {
                    licenses: licenses,
                    current: page,
                    pages: Math.ceil(count / perPage)
                };
                console.log("SENDING RESULT-->" + result);
                res.send(result);
            })
        });
    } else {
        models.License.find()
        .then(licenses => {
            res.send(licenses);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving licenses."
            });
        });        
    }
};

// Find a single country with a countryId
exports.findOne = (req, res) => {
    models.License.findById(req.params.licenseId)
    .then(license => {
        if(!license) {
            return res.status(404).send({
                message: "license not found with id " + req.params.licenseId
            });            
        }
        res.send(license);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "license not found with id " + req.params.licenseId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving license with id " + req.params.licenseId
        });
    });
};

// Update a country identified by the countryId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    models.License.findByIdAndUpdate(req.params.licenseId, {
        name: req.body.name
    }, {new: true})
    .then(license => {
        if(!license) {
            return res.status(404).send({
                message: "license not found with id " + req.params.licenseId
            });
        }
        res.send(license);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "license not found with id " + req.params.licenseId
            });                
        }
        return res.status(500).send({
            message: "Error updating license with id " + req.params.licenseId
        });
    });
};

// Delete a country with the specified countryId in the request
exports.delete = (req, res) => {
    models.License.findByIdAndRemove(req.params.licenseId)
        .then(license => {
            if(!license) {
                return res.status(404).send({
                    message: "license not found with id " + req.params.licenseId
                });
            }
            res.send({message: "license deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "license not found with id " + req.params.licenseId
                });                
            }
            return res.status(500).send({
                message: "Could not delete license with id " + req.params.licenseId
            });
    });
};