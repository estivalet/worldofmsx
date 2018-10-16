module.exports = (app) => {
    const genre = require('../controllers/genre.controller.js');

    // Index page
    app.get('/genre/index', genre.index);

    // Create a new genre
    app.post('/genre', genre.create);

    // Retrieve all genres
    app.get('/genre', genre.findAll);

    // Retrieve a single genre with genreId
    app.get('/genre/:genreId', genre.findOne);

    // Update a genre with noteId
    app.put('/genre/:genreId', genre.update);

    // Delete a genre with noteId
    app.delete('/genre/:genreId', genre.delete);
}