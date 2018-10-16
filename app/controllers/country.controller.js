const models = require('../models/schema.model.js');

exports.index = (req, res) => {
    console.log("INDEX");
    res.render('country/index', { title: "Country page" });
}

// Create and Save a new country
exports.create = (req, res) => {
    try {
console.log("----------->" + req.body.name);

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
    models.Country.find()
    .then(countries => {
        res.send(countries);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single country with a countryId
exports.findOne = (req, res) => {

};

// Update a country identified by the countryId in the request
exports.update = (req, res) => {

};

// Delete a country with the specified countryId in the request
exports.delete = (req, res) => {

};