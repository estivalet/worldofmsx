module.exports = (app) => {
    const media = require('../controllers/media.controller.js');

    // Index page
    app.get('/media/index', media.index);

    // Create a new media
    app.post('/media', media.create);

    // Retrieve all medias
    app.get('/media', media.findAll);

    // Retrieve a single media with mediaId
    app.get('/media/:mediaId', media.findOne);

    // Update a media with noteId
    app.put('/media/:mediaId', media.update);

    // Delete a media with noteId
    app.delete('/media/:mediaId', media.delete);
}