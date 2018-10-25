const models = require('../models/schema.model.js');

exports.index = (req, res) => {
    console.log("INDEX");
    res.render('media/index', { title: "media page" });
}

// Create and Save a new media
exports.create = (req, res) => {
    try {

    // Create a media.
    const media = new models.Media({
        name: req.body.name
    });

    // Save a media in the database.
    media.save()
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

    // if a number of page is passed as a parameter use it, otherwise list all medias.
    if(page) {
        models.Media.find({})
        .sort({'name': 1})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, medias) {
            models.Media.countDocuments().exec(function(err, count) {
                
                if(err) return next(err);
                
                result = {
                    medias: medias,
                    current: page,
                    pages: Math.ceil(count / perPage)
                };
                console.log("SENDING RESULT-->" + result);
                res.send(result);
            })
        });
    } else {
        models.Media.find()
        .then(medias => {
            res.send(medias);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving medias."
            });
        });        
    }
};

// Find a single country with a countryId
exports.findOne = (req, res) => {
    models.Media.findById(req.params.mediaId)
    .then(media => {
        if(!media) {
            return res.status(404).send({
                message: "media not found with id " + req.params.mediaId
            });            
        }
        res.send(media);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "media not found with id " + req.params.mediaId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving media with id " + req.params.mediaId
        });
    });
};

// Update a country identified by the countryId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    models.Media.findByIdAndUpdate(req.params.mediaId, {
        name: req.body.name
    }, {new: true})
    .then(media => {
        if(!media) {
            return res.status(404).send({
                message: "media not found with id " + req.params.mediaId
            });
        }
        res.send(media);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "media not found with id " + req.params.mediaId
            });                
        }
        return res.status(500).send({
            message: "Error updating media with id " + req.params.mediaId
        });
    });
};

// Delete a country with the specified countryId in the request
exports.delete = (req, res) => {
    models.Media.findByIdAndRemove(req.params.mediaId)
        .then(media => {
            if(!media) {
                return res.status(404).send({
                    message: "media not found with id " + req.params.mediaId
                });
            }
            res.send({message: "media deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "media not found with id " + req.params.mediaId
                });                
            }
            return res.status(500).send({
                message: "Could not delete media with id " + req.params.mediaId
            });
    });
};