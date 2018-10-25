module.exports = (app) => {
    const license = require('../controllers/license.controller.js');

    // Index page
    app.get('/license/index', license.index);

    // Create a new license
    app.post('/license', license.create);

    // Retrieve all licenses
    app.get('/license', license.findAll);

    // Retrieve a single license with licenseId
    app.get('/license/:licenseId', license.findOne);

    // Update a license with noteId
    app.put('/license/:licenseId', license.update);

    // Delete a license with noteId
    app.delete('/license/:licenseId', license.delete);
}