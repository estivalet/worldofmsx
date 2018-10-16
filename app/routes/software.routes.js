module.exports = (app) => {
    const software = require('../controllers/software.controller.js');

    // Create a new software
    app.post('/software', software.create);

    // Retrieve all countries
    app.get('/software', software.findAll);
    app.get('/software/index', software.index);

    // Retrieve a single software with softwareId
    app.get('/software/:softwareId', software.findOne);

    // Update a software with noteId
    app.put('/software/:softwareId', software.update);

    // Delete a software with noteId
    app.delete('/software/:softwareId', software.delete);
}