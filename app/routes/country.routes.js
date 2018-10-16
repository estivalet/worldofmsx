module.exports = (app) => {
    const country = require('../controllers/country.controller.js');

    // Create a new country
    app.post('/country', country.create);

    // Retrieve all countries
    app.get('/country', country.findAll);
    app.get('/country/index', country.index);

    // Retrieve a single country with countryId
    app.get('/country/:countryId', country.findOne);

    // Update a country with noteId
    app.put('/country/:countryId', country.update);

    // Delete a country with noteId
    app.delete('/country/:countryId', country.delete);
}