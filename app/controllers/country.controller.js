const models = require('../models/schema.model.js');

exports.index = (req, res) => {
    console.log("INDEX");
    res.render('country/index', { title: "country page" });
}

// Create and Save a new country
exports.create = (req, res) => {
    try {

    // Create a country.
    const country = new models.Country({
        name: req.body.name
    });

    // Save a country in the database.
    country.save()
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

    // if a number of page is passed as a parameter use it, otherwise list all countrys.
    if(page) {
        models.Country.find({})
        .sort({'name': 1})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, countrys) {
            models.Country.countDocuments().exec(function(err, count) {
                
                if(err) return next(err);
                
                result = {
                    countrys: countrys,
                    current: page,
                    pages: Math.ceil(count / perPage)
                };
                console.log("SENDING RESULT-->" + result);
                res.send(result);
            })
        });
    } else {
        models.Country.find()
        .then(countrys => {
            res.send(countrys);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving countrys."
            });
        });        
    }
};

// Find a single country with a countryId
exports.findOne = (req, res) => {
    models.Country.findById(req.params.countryId)
    .then(country => {
        if(!country) {
            return res.status(404).send({
                message: "country not found with id " + req.params.countryId
            });            
        }
        res.send(country);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "country not found with id " + req.params.countryId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving country with id " + req.params.countryId
        });
    });
};

// Update a country identified by the countryId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    models.Country.findByIdAndUpdate(req.params.countryId, {
        name: req.body.name
    }, {new: true})
    .then(country => {
        if(!country) {
            return res.status(404).send({
                message: "country not found with id " + req.params.countryId
            });
        }
        res.send(country);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "country not found with id " + req.params.countryId
            });                
        }
        return res.status(500).send({
            message: "Error updating country with id " + req.params.countryId
        });
    });
};

// Delete a country with the specified countryId in the request
exports.delete = (req, res) => {
    models.Country.findByIdAndRemove(req.params.countryId)
        .then(country => {
            if(!country) {
                return res.status(404).send({
                    message: "country not found with id " + req.params.countryId
                });
            }
            res.send({message: "country deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "country not found with id " + req.params.countryId
                });                
            }
            return res.status(500).send({
                message: "Could not delete country with id " + req.params.countryId
            });
    });
};