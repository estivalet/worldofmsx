module.exports = (app) => {
    const company = require('../controllers/company.controller.js');

    // Index page
    app.get('/company/index', company.index);

    // Create a new company
    app.post('/company', company.create);

    // Retrieve all companys
    app.get('/company', company.findAll);

    // Retrieve a single company with companyId
    app.get('/company/:companyId', company.findOne);

    // Update a company with noteId
    app.put('/company/:companyId', company.update);

    // Delete a company with noteId
    app.delete('/company/:companyId', company.delete);
}