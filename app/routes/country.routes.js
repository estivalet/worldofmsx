module.exports = (app) => {
    const country = require('../controllers/country.controller.js');

    // Index page
    app.get('/country/index', country.index);

    // Create a new country
    app.post('/country', country.create);

    // Retrieve all countrys
    app.get('/country', country.findAll);

    // Retrieve a single country with countryId
    app.get('/country/:countryId', country.findOne);

    // Update a country with noteId
    app.put('/country/:countryId', country.update);

    // Delete a country with noteId
    app.delete('/country/:countryId', country.delete);
}